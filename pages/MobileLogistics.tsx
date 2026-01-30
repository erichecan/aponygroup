import React, { useEffect, useMemo, useState, useRef } from 'react';
import { Camera, Truck, Package, ArrowRight, User, CheckCircle, Upload } from 'lucide-react';
import { LogisticsService } from '../services/logisticsService';
import { MovementType, InboundSubType, OutboundCarrier } from '../types/logistics';
import { Page } from '../types';

const STEPS = ['Type', 'Details', 'Quantity', 'Personnel', 'Photo'];
const MAX_PHOTOS = 30; // 最多 30 张 - 2026-01-14 13:44:52
const MAX_IMAGE_DIMENSION = 1280; // 压缩最大边 - 2026-01-14 13:44:52
const JPEG_QUALITY = 0.75; // 压缩质量 - 2026-01-14 13:44:52

interface MobileLogisticsProps {
    setPage?: (page: Page) => void;
}

export const MobileLogistics: React.FC<MobileLogisticsProps> = ({ setPage }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form State - 2025-01-27 添加新字段
    const [type, setType] = useState<MovementType | null>(null);
    const [subType, setSubType] = useState<InboundSubType | OutboundCarrier | null>(null);
    const [palletCount, setPalletCount] = useState<number>(0);
    const [cageCount, setCageCount] = useState<number>(0);
    const [boxCount, setBoxCount] = useState<number>(0); // 箱数 - 2025-01-27
    const [sku, setSku] = useState<string>(''); // SKU - 2025-01-27
    const [trackingNumber, setTrackingNumber] = useState<string>(''); // 快递单号 - 2025-01-27
    const [driver, setDriver] = useState<string>('');
    const [manager, setManager] = useState<string>('');
    const [photos, setPhotos] = useState<string[]>([]); // 多图 base64 - 2026-01-14 13:44:52

    // 人员名单来自后端配置 - 2026-01-14 13:44:52
    const [driverOptions, setDriverOptions] = useState<string[]>([]);
    const [managerOptions, setManagerOptions] = useState<string[]>([]);
    const [isLoadingPersonnel, setIsLoadingPersonnel] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    // 获取人员配置 - 2026-01-14 13:44:52
    useEffect(() => {
        let mounted = true;
        const load = async () => {
            try {
                setIsLoadingPersonnel(true);
                const data = await LogisticsService.getPersonnel();
                if (!mounted) return;
                setDriverOptions((data.drivers || []).map(d => d.name));
                setManagerOptions((data.managers || []).map(m => m.name));
            } catch (e) {
                // 后端未配置/不可用时，允许继续手动输入 - 2026-01-14 13:44:52
                console.warn('Failed to load personnel config, fallback to manual input:', e);
            } finally {
                if (mounted) setIsLoadingPersonnel(false);
            }
        };
        load();
        return () => { mounted = false; };
    }, []);

    const canProceedPersonnel = useMemo(() => Boolean(driver?.trim() || manager?.trim()), [driver, manager]);

    // 将图片压缩为 base64（减小传输/入库体积）- 2026-01-14 13:44:52
    const compressImageToDataUrl = async (file: File): Promise<string> => {
        const bitmap = await createImageBitmap(file);
        const ratio = Math.min(1, MAX_IMAGE_DIMENSION / Math.max(bitmap.width, bitmap.height));
        const targetW = Math.max(1, Math.round(bitmap.width * ratio));
        const targetH = Math.max(1, Math.round(bitmap.height * ratio));

        const canvas = document.createElement('canvas');
        canvas.width = targetW;
        canvas.height = targetH;
        const ctx = canvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context not available');
        ctx.drawImage(bitmap, 0, 0, targetW, targetH);
        bitmap.close();

        return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
    };

    const handleNext = () => {
        if (currentStep < STEPS.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        }
    };

    const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        try {
            const remaining = Math.max(0, MAX_PHOTOS - photos.length);
            const selected = files.slice(0, remaining);
            if (selected.length === 0) {
                setError(`最多只能上传 ${MAX_PHOTOS} 张图片`);
                return;
            }

            const results: string[] = [];
            for (const f of selected) {
                // eslint-disable-next-line no-await-in-loop
                const dataUrl = await compressImageToDataUrl(f);
                results.push(dataUrl);
            }
            setPhotos(prev => [...prev, ...results].slice(0, MAX_PHOTOS));
        } catch (err) {
            console.error(err);
            setError(err instanceof Error ? err.message : '图片处理失败');
        } finally {
            // 允许再次选择同一文件 - 2026-01-14 13:44:52
            e.target.value = '';
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            if (!type || !subType) throw new Error('Missing required fields');

            await LogisticsService.submitMovement({
                type,
                subType,
                palletCount,
                cageCount,
                boxCount, // 箱数 - 2025-01-27
                sku, // SKU - 2025-01-27
                trackingNumber, // 快递单号 - 2025-01-27
                driverName: driver || undefined,
                managerName: manager || undefined,
                photoUrls: photos, // 最多 30 张 - 2026-01-14 13:44:52
            });

            // Success Animation/Redirect
            alert('Success! Record saved.');
            if (setPage) setPage('home');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Submission failed');
        } finally {
            setLoading(false);
        }
    };

    // --- Render Steps ---

    const renderTypeSelection = () => (
        <div className="grid grid-cols-1 gap-6">
            <button
                onClick={() => { setType('INBOUND'); handleNext(); }}
                className="relative group p-8 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
                <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col items-center">
                    <Package size={64} className="mb-4 text-emerald-100" />
                    <h2 className="text-3xl font-bold">Inbound</h2>
                    <p className="text-emerald-100 mt-2">Receiving Goods</p>
                </div>
            </button>

            <button
                onClick={() => { setType('OUTBOUND'); handleNext(); }}
                className="relative group p-8 rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
            >
                <div className="absolute inset-0 bg-white/10 rounded-3xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex flex-col items-center">
                    <Truck size={64} className="mb-4 text-indigo-100" />
                    <h2 className="text-3xl font-bold">Outbound</h2>
                    <p className="text-indigo-100 mt-2">Shipping Goods</p>
                </div>
            </button>
        </div>
    );

    const renderSubTypeSelection = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">
                {type === 'INBOUND' ? 'Inbound Type' : 'Select Carrier'}
            </h3>

            <div className="grid grid-cols-1 gap-4">
                {type === 'INBOUND' ? (
                    <>
                        <OptionButton label="New Product" onClick={() => { setSubType('NEW_PRODUCT'); handleNext(); }} />
                        <OptionButton label="Return" onClick={() => { setSubType('RETURN'); handleNext(); }} />
                    </>
                ) : (
                    <>
                        <OptionButton label="StraightShip" onClick={() => { setSubType('STRAIGHTSHIP'); handleNext(); }} />
                        <OptionButton label="Day & Ross" onClick={() => { setSubType('DAY_ROSS'); handleNext(); }} />
                        <OptionButton label="Other" onClick={() => { setSubType('OTHER'); handleNext(); }} />
                    </>
                )}
            </div>
        </div>
    );

    const OptionButton = ({ label, onClick }: { label: string, onClick: () => void }) => (
        <button
            onClick={onClick}
            className="w-full p-6 text-left rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-orange-500 hover:shadow-md transition-all flex justify-between items-center group"
        >
            <span className="text-xl font-medium text-slate-700 group-hover:text-orange-600">{label}</span>
            <ArrowRight className="text-slate-300 group-hover:text-orange-500" />
        </button>
    );

    const renderQuantity = () => (
        <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-800">Quantity</h3>

            {/* Pallets */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <label className="block text-slate-500 mb-2">Pallets (托)</label>
                <div className="flex items-center justify-between">
                    <button onClick={() => setPalletCount(Math.max(0, palletCount - 1))} className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 text-2xl font-bold">-</button>
                    <span className="text-4xl font-bold text-slate-800">{palletCount}</span>
                    <button onClick={() => setPalletCount(palletCount + 1)} className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 text-2xl font-bold">+</button>
                </div>
            </div>

            {/* Cages */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <label className="block text-slate-500 mb-2">Cages (笼)</label>
                <div className="flex items-center justify-between">
                    <button onClick={() => setCageCount(Math.max(0, cageCount - 1))} className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 text-2xl font-bold">-</button>
                    <span className="text-4xl font-bold text-slate-800">{cageCount}</span>
                    <button onClick={() => setCageCount(cageCount + 1)} className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 text-2xl font-bold">+</button>
                </div>
            </div>

            {/* Boxes - 箱数 - 2025-01-27 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <label className="block text-slate-500 mb-2">Boxes (箱)</label>
                <div className="flex items-center justify-between">
                    <button onClick={() => setBoxCount(Math.max(0, boxCount - 1))} className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 text-2xl font-bold">-</button>
                    <span className="text-4xl font-bold text-slate-800">{boxCount}</span>
                    <button onClick={() => setBoxCount(boxCount + 1)} className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 text-2xl font-bold">+</button>
                </div>
            </div>

            {/* SKU - 2025-01-27 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <label className="block text-slate-500 mb-2">SKU</label>
                <input
                    type="text"
                    value={sku}
                    onChange={(e) => setSku(e.target.value)}
                    placeholder="Enter SKU..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-lg"
                />
            </div>

            {/* Tracking Number - 快递单号 - 2025-01-27 */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <label className="block text-slate-500 mb-2">Tracking Number (快递单号)</label>
                <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Enter tracking number..."
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none text-lg"
                />
            </div>

            <button onClick={handleNext} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg">Confirm Quantity</button>
        </div>
    );

    const renderPersonnel = () => (
        <div className="space-y-6">
            <h3 className="text-2xl font-bold text-slate-800">Personnel</h3>

            {/* Drivers */}
            <div>
                <label className="block text-sm font-medium text-slate-500 mb-3">Driver</label>
                <div className="flex flex-wrap gap-3">
                    {driverOptions.map((name) => (
                        <button
                            key={name}
                            onClick={() => setDriver(name)}
                            className={`px-4 py-2 rounded-full border ${driver === name ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-600 border-slate-200'}`}
                        >
                            {name}
                        </button>
                    ))}
                    <input
                        type="text"
                        placeholder={isLoadingPersonnel ? 'Loading...' : 'Other...'}
                        value={driver}
                        onChange={(e) => setDriver(e.target.value)}
                        className="px-4 py-2 rounded-full border border-slate-200 bg-transparent focus:ring-2 focus:ring-orange-500 outline-none w-32"
                    />
                </div>
            </div>

            {/* Managers */}
            <div className="mt-6">
                <label className="block text-sm font-medium text-slate-500 mb-3">Warehouse Manager</label>
                <div className="flex flex-wrap gap-3">
                    {managerOptions.map((name) => (
                        <button
                            key={name}
                            onClick={() => setManager(name)}
                            className={`px-4 py-2 rounded-full border ${manager === name ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-slate-600 border-slate-200'}`}
                        >
                            {name}
                        </button>
                    ))}
                    <input
                        type="text"
                        placeholder={isLoadingPersonnel ? 'Loading...' : 'Other...'}
                        value={manager}
                        onChange={(e) => setManager(e.target.value)}
                        className="px-4 py-2 rounded-full border border-slate-200 bg-transparent focus:ring-2 focus:ring-orange-500 outline-none w-40"
                    />
                </div>
            </div>

            <button onClick={handleNext} disabled={!canProceedPersonnel} className="w-full py-4 mt-8 bg-slate-900 text-white rounded-xl font-bold text-lg shadow-lg disabled:opacity-50">Next Step</button>
        </div>
    );

    const renderPhoto = () => (
        <div className="space-y-6 text-center">
            <h3 className="text-2xl font-bold text-slate-800">Photo Evidence</h3>

            <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 rounded-3xl h-64 flex flex-col items-center justify-center bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors"
            >
                {photos.length > 0 ? (
                    <div className="w-full h-full p-3 overflow-auto">
                        <div className="grid grid-cols-3 gap-2">
                            {photos.map((p, idx) => (
                                <div key={`${idx}`} className="relative">
                                    <img src={p} alt={`Evidence ${idx + 1}`} className="w-full h-20 object-cover rounded-xl" />
                                    <button
                                        type="button"
                                        onClick={(ev) => {
                                            ev.stopPropagation();
                                            setPhotos(prev => prev.filter((_, i) => i !== idx));
                                        }}
                                        className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-black/70 text-white text-xs flex items-center justify-center"
                                        aria-label="Remove photo"
                                    >
                                        ×
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-3 text-sm text-slate-500">{photos.length}/{MAX_PHOTOS} photos</div>
                    </div>
                ) : (
                    <>
                        <Camera size={48} className="text-slate-400 mb-4" />
                        <p className="text-slate-500">Tap to add photos (max {MAX_PHOTOS})</p>
                    </>
                )}
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handlePhotoUpload}
                />
            </div>

            {photos.length > 0 && (
                <button
                    type="button"
                    onClick={() => setPhotos([])}
                    className="w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-lg shadow-sm"
                >
                    Clear Photos
                </button>
            )}

            <button
                onClick={handleNext}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-2"
            >
                {loading ? 'Submitting...' : <><CheckCircle /> Submit Record</>}
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 pb-safe">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 px-4 py-4 flex items-center justify-between">
                {currentStep > 0 && (
                    <button onClick={handleBack} className="text-slate-600 font-medium">Back</button>
                )}
                <h1 className="text-lg font-bold text-slate-900 mx-auto">Logistic Flow</h1>
                <div className="w-8" /> {/* Spacer */}
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-slate-200 w-full">
                <div
                    className="h-full bg-orange-500 transition-all duration-300 ease-out"
                    style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                />
            </div>

            {/* Content */}
            <div className="p-6 max-w-lg mx-auto">
                {currentStep === 0 && renderTypeSelection()}
                {currentStep === 1 && renderSubTypeSelection()}
                {currentStep === 2 && renderQuantity()}
                {currentStep === 3 && renderPersonnel()}
                {currentStep === 4 && renderPhoto()}
            </div>

            {error && (
                <div className="fixed bottom-4 left-4 right-4 bg-red-100 text-red-600 p-4 rounded-xl border border-red-200 text-center animate-bounce">
                    {error}
                </div>
            )}
        </div>
    );
};
