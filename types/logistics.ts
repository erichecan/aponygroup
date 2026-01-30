export type MovementType = 'INBOUND' | 'OUTBOUND';
export type InboundSubType = 'NEW_PRODUCT' | 'RETURN';
export type OutboundCarrier = 'STRAIGHTSHIP' | 'DAY_ROSS' | 'OTHER';

export interface WarehouseMovement {
    id: string;
    type: MovementType;
    subType: InboundSubType | OutboundCarrier;
    palletCount: number;
    cageCount: number;
    boxCount?: number; // 箱数 - 2025-01-27
    sku?: string; // SKU - 2025-01-27
    trackingNumber?: string; // 快递单号 - 2025-01-27
    driverName?: string;
    managerName?: string;
    photoUrls: string[];
    timestamp: string;
    location?: string;
}

export interface Personnel {
    id: string;
    name: string;
    role: 'DRIVER' | 'MANAGER';
    avatar?: string;
}

// Mock Data for Personnel
export const MOCK_DRIVERS: Personnel[] = [
    { id: 'd1', name: 'John Doe', role: 'DRIVER' },
    { id: 'd2', name: 'Mike Smith', role: 'DRIVER' },
    { id: 'd3', name: 'Sarah Jones', role: 'DRIVER' },
];

export const MOCK_MANAGERS: Personnel[] = [
    { id: 'm1', name: 'Admin Alice', role: 'MANAGER' },
    { id: 'm2', name: 'Manager Bob', role: 'MANAGER' },
];
