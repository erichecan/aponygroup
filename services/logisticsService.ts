import { WarehouseMovement } from '../types/logistics';

// This should point to the deployed Cloud Function URL
// For local development, we might need a proxy or direct URL if CORS allows.
// Since we don't have the live URL yet, we will use a placeholder or assume a local proxy.
// BUT, the user wants "system".
// Let's assume for now we use the /api prefix which Nginx or Vite proxy handles.
// Or effectively, we can put the full URL if we knew it.
// For now, I'll use a relative path assuming a proxy is set up or will be set up.
// Wait, for local dev with Vite, we can proxy /api/logistics to the local function if running?
// Or we just point to the production URL once deployed.
// Let's use an environment variable.

const API_BASE_URL = import.meta.env.VITE_LOGISTICS_API_URL || 'http://localhost:8080';

// 物流系统前端 API 封装 - 2026-01-14 00:00:00
export const LogisticsService = {
    async submitMovement(movement: Omit<WarehouseMovement, 'id' | 'timestamp'>): Promise<WarehouseMovement> {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movement),
        });

        if (!response.ok) {
            throw new Error('Failed to submit movement');
        }

        const result = await response.json();
        return result.data;
    },

    async getMovements(page: number = 1, limit: number = 10): Promise<{ data: WarehouseMovement[], total: number }> {
        const response = await fetch(`${API_BASE_URL}?page=${page}&limit=${limit}`);

        if (!response.ok) {
            throw new Error('Failed to fetch movements');
        }

        const result = await response.json();
        return {
            data: result.data,
            total: result.pagination.total
        };
    },

    // 获取司机/库管名单 - 2026-01-14 00:00:00
    async getPersonnel(): Promise<{ drivers: { id: string; name: string }[]; managers: { id: string; name: string }[] }> {
        const response = await fetch(`${API_BASE_URL}/personnel`, { method: 'GET' });
        if (!response.ok) {
            throw new Error('Failed to fetch personnel');
        }
        const result = await response.json();
        return result.data;
    },

    // 覆盖更新司机/库管名单 - 2026-01-14 00:00:00
    async updatePersonnel(payload: { drivers: string[]; managers: string[] }): Promise<void> {
        const response = await fetch(`${API_BASE_URL}/personnel`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        });
        if (!response.ok) {
            throw new Error('Failed to update personnel');
        }
    },
};
