import React, { useState, useEffect } from 'react';
import { Truck, Package, Calendar, User, Search, ChevronLeft, ChevronRight, LayoutGrid, List, FileText, Eye, X, Image as ImageIcon } from 'lucide-react';
import { LogisticsService } from '../services/logisticsService';
import { WarehouseMovement } from '../types/logistics';

export const LogisticsDashboard: React.FC = () => {
    const [movements, setMovements] = useState<WarehouseMovement[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
    const limit = 10;

    // 详情弹窗 - 2026-01-14 15:25:20
    const [selectedMovement, setSelectedMovement] = useState<WarehouseMovement | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    // 人员配置弹窗 - 2026-01-14 13:44:52
    const [isPersonnelOpen, setIsPersonnelOpen] = useState(false);
    const [personnelDrivers, setPersonnelDrivers] = useState<string[]>([]);
    const [personnelManagers, setPersonnelManagers] = useState<string[]>([]);
    const [loadingPersonnel, setLoadingPersonnel] = useState(false);
    const [savingPersonnel, setSavingPersonnel] = useState(false);
    const [newDriverName, setNewDriverName] = useState('');
    const [newManagerName, setNewManagerName] = useState('');
    const [personnelError, setPersonnelError] = useState<string | null>(null);

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const result = await LogisticsService.getMovements(page, limit);
            setMovements(result.data);
            setTotal(result.total);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        } finally {
            setLoading(false);
        }
    };

    const openPersonnelModal = async () => {
        setIsPersonnelOpen(true);
        setPersonnelError(null);
        try {
            setLoadingPersonnel(true);
            const data = await LogisticsService.getPersonnel();
            setPersonnelDrivers((data.drivers || []).map(d => d.name));
            setPersonnelManagers((data.managers || []).map(m => m.name));
        } catch (e) {
            console.error(e);
            setPersonnelError(e instanceof Error ? e.message : 'Failed to load personnel');
        } finally {
            setLoadingPersonnel(false);
        }
    };

    const savePersonnel = async () => {
        try {
            setSavingPersonnel(true);
            setPersonnelError(null);
            await LogisticsService.updatePersonnel({
                drivers: personnelDrivers,
                managers: personnelManagers,
            });
            setIsPersonnelOpen(false);
            // 保存后可选刷新数据 - 2026-01-14 13:44:52
            await fetchData();
        } catch (e) {
            console.error(e);
            setPersonnelError(e instanceof Error ? e.message : 'Failed to save personnel');
        } finally {
            setSavingPersonnel(false);
        }
    };

    const totalPages = Math.ceil(total / limit);

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleString();
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-24 pb-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Logistics Management</h1>
                        <p className="text-slate-500 mt-1">Real-time shipping and receiving records from the remote database.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex bg-white rounded-lg border border-slate-200 p-1">
                            <button
                                onClick={() => setViewMode('table')}
                                className={`p-2 rounded ${viewMode === 'table' ? 'bg-orange-50 text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <List size={20} />
                            </button>
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-orange-50 text-orange-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <LayoutGrid size={20} />
                            </button>
                        </div>

                        <button
                            onClick={openPersonnelModal}
                            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            人员配置
                        </button>

                        <button
                            onClick={() => fetchData()}
                            className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors flex items-center gap-2"
                        >
                            Refresh
                        </button>
                    </div>
                </div>

                {/* Stats Summary */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <StatCard title="Total Records" value={total} icon={FileText} color="blue" />
                    <StatCard title="Inbound Today" value={movements.filter(m => m.type === 'INBOUND').length} icon={Package} color="emerald" />
                    <StatCard title="Outbound Today" value={movements.filter(m => m.type === 'OUTBOUND').length} icon={Truck} color="indigo" />
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                    {loading ? (
                        <div className="p-20 flex flex-col items-center justify-center">
                            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                            <p className="text-slate-400 mt-4 font-medium">Loading records...</p>
                        </div>
                    ) : movements.length === 0 ? (
                        <div className="p-20 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 text-slate-400 mb-4">
                                <Search size={32} />
                            </div>
                            <h3 className="text-lg font-bold text-slate-900">No records found</h3>
                            <p className="text-slate-500">Records created via the mobile entry system will appear here.</p>
                        </div>
                    ) : viewMode === 'table' ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-slate-200">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Type</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Details</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Quantity</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Personnel</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Date & Time</th>
                                        <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {movements.map((m) => (
                                        <tr key={m.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer" onClick={() => setSelectedMovement(m)}>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${m.type === 'INBOUND' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'
                                                    }`}>
                                                    {m.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900">{m.subType}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-4">
                                                    <span className="text-slate-600"><span className="font-bold text-slate-900">{m.palletCount}</span> Pallet</span>
                                                    <span className="text-slate-600"><span className="font-bold text-slate-900">{m.cageCount}</span> Cage</span>
                                                    <span className="text-slate-600"><span className="font-bold text-slate-900">{m.boxCount ?? 0}</span> Box</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="space-y-1">
                                                    <div className="text-sm flex items-center gap-1.5 text-slate-700">
                                                        <Truck size={14} className="text-slate-400" /> {m.driverName}
                                                    </div>
                                                    <div className="text-sm flex items-center gap-1.5 text-slate-700">
                                                        <User size={14} className="text-slate-400" /> {m.managerName}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-slate-500 text-sm">
                                                    <Calendar size={14} /> {formatDate(m.timestamp)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedMovement(m);
                                                    }}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors text-sm font-semibold"
                                                >
                                                    <Eye size={14} /> View
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                            {movements.map((m) => (
                                <div
                                    key={m.id}
                                    onClick={() => setSelectedMovement(m)}
                                    className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${m.type === 'INBOUND' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'
                                            }`}>
                                            {m.type}
                                        </span>
                                        <span className="text-xs text-slate-400">{formatDate(m.timestamp)}</span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-lg mb-4">{m.subType}</h4>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-slate-50 p-3 rounded-lg">
                                            <div className="text-[10px] text-slate-400 uppercase font-bold">Pallets</div>
                                            <div className="text-xl font-bold">{m.palletCount}</div>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg">
                                            <div className="text-[10px] text-slate-400 uppercase font-bold">Cages</div>
                                            <div className="text-xl font-bold">{m.cageCount}</div>
                                        </div>
                                        <div className="bg-slate-50 p-3 rounded-lg col-span-2">
                                            <div className="text-[10px] text-slate-400 uppercase font-bold">Boxes / SKU / Tracking</div>
                                            <div className="text-sm text-slate-700 mt-1">
                                                <span className="font-bold">{m.boxCount ?? 0}</span> Box
                                                {m.sku ? <span className="ml-3">SKU: <span className="font-semibold">{m.sku}</span></span> : null}
                                                {m.trackingNumber ? <span className="ml-3">Tracking: <span className="font-semibold">{m.trackingNumber}</span></span> : null}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm text-slate-600">
                                        <span className="flex items-center gap-1.5"><Truck size={14} /> {m.driverName}</span>
                                        <span className="flex items-center gap-1.5"><User size={14} /> {m.managerName}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                Showing <span className="font-medium">{(page - 1) * limit + 1}</span> to <span className="font-medium">{Math.min(page * limit, total)}</span> of <span className="font-medium">{total}</span> records
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(1, p - 1))}
                                    disabled={page === 1}
                                    className="p-2 border border-slate-200 rounded-lg bg-white disabled:opacity-50 hover:bg-slate-50 transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="flex items-center gap-1 px-4">
                                    <span className="font-bold text-slate-900">{page}</span>
                                    <span className="text-slate-400">/</span>
                                    <span className="text-slate-500">{totalPages}</span>
                                </div>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                    disabled={page === totalPages}
                                    className="p-2 border border-slate-200 rounded-lg bg-white disabled:opacity-50 hover:bg-slate-50 transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* 人员配置弹窗 - 2026-01-14 13:44:52 */}
                {isPersonnelOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
                            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">人员配置</h2>
                                    <p className="text-sm text-slate-500">配置后移动端会自动拉取最新名单</p>
                                </div>
                                <button
                                    onClick={() => setIsPersonnelOpen(false)}
                                    className="w-10 h-10 rounded-lg hover:bg-slate-100 text-slate-600"
                                    aria-label="Close"
                                >
                                    ×
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {personnelError && (
                                    <div className="p-3 rounded-lg bg-red-50 text-red-700 border border-red-100">
                                        {personnelError}
                                    </div>
                                )}

                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Drivers */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-bold text-slate-900">司机 (Drivers)</h3>
                                            <span className="text-xs text-slate-500">{personnelDrivers.length} 个</span>
                                        </div>

                                        <div className="flex gap-2 mb-3">
                                            <input
                                                value={newDriverName}
                                                onChange={(e) => setNewDriverName(e.target.value)}
                                                placeholder="新增司机名字..."
                                                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                                disabled={loadingPersonnel || savingPersonnel}
                                            />
                                            <button
                                                onClick={() => {
                                                    const name = newDriverName.trim();
                                                    if (!name) return;
                                                    setPersonnelDrivers(prev => [...prev, name]);
                                                    setNewDriverName('');
                                                }}
                                                className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold disabled:opacity-50"
                                                disabled={loadingPersonnel || savingPersonnel}
                                            >
                                                添加
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {personnelDrivers.map((name, idx) => (
                                                <span key={`${name}-${idx}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">
                                                    {name}
                                                    <button
                                                        type="button"
                                                        onClick={() => setPersonnelDrivers(prev => prev.filter((_, i) => i !== idx))}
                                                        className="text-slate-500 hover:text-slate-900"
                                                        aria-label="Remove driver"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Managers */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="font-bold text-slate-900">库管 (Managers)</h3>
                                            <span className="text-xs text-slate-500">{personnelManagers.length} 个</span>
                                        </div>

                                        <div className="flex gap-2 mb-3">
                                            <input
                                                value={newManagerName}
                                                onChange={(e) => setNewManagerName(e.target.value)}
                                                placeholder="新增库管名字..."
                                                className="flex-1 px-3 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                                                disabled={loadingPersonnel || savingPersonnel}
                                            />
                                            <button
                                                onClick={() => {
                                                    const name = newManagerName.trim();
                                                    if (!name) return;
                                                    setPersonnelManagers(prev => [...prev, name]);
                                                    setNewManagerName('');
                                                }}
                                                className="px-4 py-2 rounded-lg bg-slate-900 text-white font-semibold disabled:opacity-50"
                                                disabled={loadingPersonnel || savingPersonnel}
                                            >
                                                添加
                                            </button>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {personnelManagers.map((name, idx) => (
                                                <span key={`${name}-${idx}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700">
                                                    {name}
                                                    <button
                                                        type="button"
                                                        onClick={() => setPersonnelManagers(prev => prev.filter((_, i) => i !== idx))}
                                                        className="text-slate-500 hover:text-slate-900"
                                                        aria-label="Remove manager"
                                                    >
                                                        ×
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-3">
                                <button
                                    onClick={() => setIsPersonnelOpen(false)}
                                    className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700"
                                    disabled={savingPersonnel}
                                >
                                    取消
                                </button>
                                <button
                                    onClick={savePersonnel}
                                    className="px-5 py-2 rounded-lg bg-[#FF6B35] text-white font-bold disabled:opacity-50"
                                    disabled={loadingPersonnel || savingPersonnel}
                                >
                                    {savingPersonnel ? '保存中...' : '保存'}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 详情弹窗 - 2026-01-14 15:25:20 */}
                {selectedMovement && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onClick={() => setSelectedMovement(null)}>
                        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                            {/* Header */}
                            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-gradient-to-r from-slate-50 to-white sticky top-0 z-10">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Record Details</h2>
                                    <p className="text-sm text-slate-500 mt-0.5">Complete information and photo evidence</p>
                                </div>
                                <button
                                    onClick={() => setSelectedMovement(null)}
                                    className="w-10 h-10 rounded-lg hover:bg-slate-100 text-slate-600 flex items-center justify-center transition-colors"
                                    aria-label="Close"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6">
                                {/* Type & Timestamp */}
                                <div className="flex items-center justify-between">
                                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold ${selectedMovement.type === 'INBOUND' ? 'bg-emerald-100 text-emerald-700' : 'bg-indigo-100 text-indigo-700'}`}>
                                        {selectedMovement.type} - {selectedMovement.subType}
                                    </span>
                                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                                        <Calendar size={16} />
                                        {formatDate(selectedMovement.timestamp)}
                                    </div>
                                </div>

                                {/* Details Grid */}
                                <div className="grid md:grid-cols-2 gap-6">
                                    {/* Quantity */}
                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Quantity</h3>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-600">Pallets:</span>
                                                <span className="font-bold text-slate-900 text-lg">{selectedMovement.palletCount}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-600">Cages:</span>
                                                <span className="font-bold text-slate-900 text-lg">{selectedMovement.cageCount}</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-slate-600">Boxes:</span>
                                                <span className="font-bold text-slate-900 text-lg">{selectedMovement.boxCount ?? 0}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Personnel */}
                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Personnel</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                                                    <Truck size={16} className="text-orange-600" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500">Driver</div>
                                                    <div className="font-semibold text-slate-900">{selectedMovement.driverName}</div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                                    <User size={16} className="text-blue-600" />
                                                </div>
                                                <div>
                                                    <div className="text-xs text-slate-500">Manager</div>
                                                    <div className="font-semibold text-slate-900">{selectedMovement.managerName}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Additional Info */}
                                    {(selectedMovement.sku || selectedMovement.trackingNumber) && (
                                        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 md:col-span-2">
                                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Additional Information</h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {selectedMovement.sku && (
                                                    <div>
                                                        <div className="text-xs text-slate-500 mb-1">SKU</div>
                                                        <div className="font-mono font-semibold text-slate-900 bg-white px-3 py-2 rounded-lg border border-slate-200">
                                                            {selectedMovement.sku}
                                                        </div>
                                                    </div>
                                                )}
                                                {selectedMovement.trackingNumber && (
                                                    <div>
                                                        <div className="text-xs text-slate-500 mb-1">Tracking Number</div>
                                                        <div className="font-mono font-semibold text-slate-900 bg-white px-3 py-2 rounded-lg border border-slate-200">
                                                            {selectedMovement.trackingNumber}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Photo Gallery */}
                                {selectedMovement.photoUrls && selectedMovement.photoUrls.length > 0 ? (
                                    <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                                                <ImageIcon size={16} />
                                                Photo Evidence ({selectedMovement.photoUrls.length})
                                            </h3>
                                        </div>

                                        {/* Main Image */}
                                        <div className="mb-4 bg-slate-900 rounded-xl overflow-hidden aspect-video flex items-center justify-center">
                                            <img
                                                src={selectedMovement.photoUrls[selectedImageIndex]}
                                                alt={`Photo ${selectedImageIndex + 1}`}
                                                className="max-w-full max-h-full object-contain"
                                            />
                                        </div>

                                        {/* Thumbnail Navigation */}
                                        {selectedMovement.photoUrls.length > 1 && (
                                            <div className="flex gap-2 overflow-x-auto pb-2">
                                                {selectedMovement.photoUrls.map((url, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setSelectedImageIndex(idx)}
                                                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${idx === selectedImageIndex
                                                                ? 'border-orange-500 ring-2 ring-orange-200'
                                                                : 'border-slate-200 hover:border-slate-300'
                                                            }`}
                                                    >
                                                        <img
                                                            src={url}
                                                            alt={`Thumbnail ${idx + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="bg-slate-50 rounded-xl p-8 border border-slate-200 text-center">
                                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-200 text-slate-400 mb-3">
                                            <ImageIcon size={24} />
                                        </div>
                                        <p className="text-slate-500 text-sm">No photos attached to this record</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end">
                                <button
                                    onClick={() => setSelectedMovement(null)}
                                    className="px-5 py-2 rounded-lg bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div >
    );
};

const StatCard = ({ title, value, icon: Icon, color }: { title: string, value: number, icon: any, color: string }) => {
    const colorMap: any = {
        blue: 'bg-blue-50 text-blue-600',
        emerald: 'bg-emerald-50 text-emerald-600',
        indigo: 'bg-indigo-50 text-indigo-600',
    };

    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${colorMap[color] || 'bg-slate-50 text-slate-600'}`}>
                    <Icon size={24} />
                </div>
                <div>
                    <p className="text-sm font-medium text-slate-500">{title}</p>
                    <p className="text-2xl font-bold text-slate-900">{value}</p>
                </div>
            </div>
        </div>
    );
};
