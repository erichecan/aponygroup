const functions = require('@google-cloud/functions-framework');
const { Client } = require('pg');

// TODO: In production, use Secret Manager. For now, using direct connection string as requested.
const CONNECTION_STRING = 'postgresql://neondb_owner:npg_k9yivEBgTQ7O@ep-withered-meadow-ahlm3kxq-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

// Helper to get DB client
const getClient = () => {
    return new Client({
        connectionString: CONNECTION_STRING,
        ssl: { rejectUnauthorized: false }
    });
};

// 移动端收发货系统 API - 2026-01-14 13:44:52
// 支持：
// - / (GET 分页查询 movements, POST 新增 movement)
// - /personnel (GET 获取司机/库管名单, PUT 覆盖更新名单)

functions.http('logisticsApi', async (req, res) => {
    // CORS Headers
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS');
    res.set('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
        return;
    }

    const client = getClient();
    try {
        await client.connect();

        // 资源路由 - 2026-01-14 00:00:00
        const path = req.path || '/';
        if (path === '/personnel') {
            if (req.method === 'GET') {
                const role = (req.query.role || '').toString().toUpperCase();
                const params = [];
                let where = "WHERE active = TRUE";
                if (role === 'DRIVER' || role === 'MANAGER') {
                    where += " AND role = $1";
                    params.push(role);
                }

                const q = `
                    SELECT id, role, name, sort_order
                    FROM warehouse_personnel
                    ${where}
                    ORDER BY role ASC, sort_order ASC, created_at ASC
                `;

                const rows = (await client.query(q, params)).rows;
                const drivers = rows.filter(r => r.role === 'DRIVER').map(r => ({ id: r.id, name: r.name, sortOrder: r.sort_order }));
                const managers = rows.filter(r => r.role === 'MANAGER').map(r => ({ id: r.id, name: r.name, sortOrder: r.sort_order }));

                res.status(200).json({ success: true, data: { drivers, managers } });
                return;
            }

            if (req.method === 'PUT') {
                const { drivers = [], managers = [] } = req.body || {};

                const normalize = (arr) => (
                    Array.isArray(arr)
                        ? arr
                            .map(v => (typeof v === 'string' ? v.trim() : ''))
                            .filter(Boolean)
                            .slice(0, 50) // 安全限制 - 2026-01-14 00:00:00
                        : []
                );

                const driverNames = normalize(drivers);
                const managerNames = normalize(managers);

                await client.query('BEGIN');
                // 覆盖式更新：先把旧的禁用，再插入新的（保留历史）- 2026-01-14 00:00:00
                await client.query("UPDATE warehouse_personnel SET active = FALSE, updated_at = NOW() WHERE role IN ('DRIVER','MANAGER') AND active = TRUE");

                const insertSql = `INSERT INTO warehouse_personnel (role, name, sort_order, active) VALUES ($1, $2, $3, TRUE)`;
                for (let i = 0; i < driverNames.length; i++) {
                    // eslint-disable-next-line no-await-in-loop
                    await client.query(insertSql, ['DRIVER', driverNames[i], i + 1]);
                }
                for (let i = 0; i < managerNames.length; i++) {
                    // eslint-disable-next-line no-await-in-loop
                    await client.query(insertSql, ['MANAGER', managerNames[i], i + 1]);
                }
                await client.query('COMMIT');

                res.status(200).json({ success: true, message: 'Personnel updated' });
                return;
            }

            res.status(405).send('Method Not Allowed');
            return;
        }

        if (req.method === 'POST') {
            const { type, subType, palletCount, cageCount, boxCount, sku, trackingNumber, driverName, managerName, photoUrls = [] } = req.body;

            // 图片数量限制（当前采用 base64 存 DB，避免过大）- 2026-01-14 13:44:52
            // 说明：前端已限制最多 30 张；后端兜底同样限制为 30 张
            const safePhotoUrls = Array.isArray(photoUrls) ? photoUrls.slice(0, 30) : [];

            const query = `
        INSERT INTO warehouse_movements 
        (type, sub_type, pallet_count, cage_count, box_count, sku, tracking_number, driver_name, manager_name, photo_urls)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING 
          id,
          type,
          sub_type as "subType",
          pallet_count as "palletCount",
          cage_count as "cageCount",
          box_count as "boxCount",
          sku,
          tracking_number as "trackingNumber",
          driver_name as "driverName",
          manager_name as "managerName",
          photo_urls as "photoUrls",
          created_at as "timestamp";
      `;

            const result = await client.query(query, [type, subType, palletCount || 0, cageCount || 0, boxCount || 0, sku || null, trackingNumber || null, driverName || null, managerName || null, safePhotoUrls]);
            res.status(200).json({ success: true, data: result.rows[0] });

        } else if (req.method === 'GET') {
            // Pagination logic
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const offset = (page - 1) * limit;

            const countResult = await client.query('SELECT COUNT(*) FROM warehouse_movements');
            const total = parseInt(countResult.rows[0].count);

            const query = `
        SELECT
          id,
          type,
          sub_type as "subType",
          pallet_count as "palletCount",
          cage_count as "cageCount",
          box_count as "boxCount",
          sku,
          tracking_number as "trackingNumber",
          driver_name as "driverName",
          manager_name as "managerName",
          photo_urls as "photoUrls",
          created_at as "timestamp"
        FROM warehouse_movements
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
      `;

            const result = await client.query(query, [limit, offset]);

            res.status(200).json({
                success: true,
                data: result.rows,
                pagination: {
                    total,
                    page,
                    limit,
                    totalPages: Math.ceil(total / limit)
                }
            });
        } else {
            res.status(405).send('Method Not Allowed');
        }

    } catch (error) {
        console.error('Database Error:', error);
        try { await client.query('ROLLBACK'); } catch (_) {}
        res.status(500).json({ success: false, error: error.message });
    } finally {
        await client.end();
    }
});
