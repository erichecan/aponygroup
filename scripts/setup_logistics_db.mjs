import pg from 'pg';

const connectionString = 'postgresql://neondb_owner:npg_k9yivEBgTQ7O@ep-withered-meadow-ahlm3kxq-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const client = new pg.Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

// 移动端收发货系统 DB 初始化/迁移脚本 - 2026-01-14 00:00:00
const createTableSql = `
CREATE TABLE IF NOT EXISTS warehouse_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(20) NOT NULL, -- 'INBOUND' or 'OUTBOUND'
    sub_type VARCHAR(50), -- 'NEW_PRODUCT', 'RETURN', 'STRAIGHTSHIP', 'DAY_ROSS', 'OTHER'
    pallet_count INTEGER DEFAULT 0,
    cage_count INTEGER DEFAULT 0,
    box_count INTEGER DEFAULT 0, -- 箱数 - 2025-01-27
    sku VARCHAR(200), -- SKU - 2025-01-27
    tracking_number VARCHAR(200), -- 快递单号 - 2025-01-27
    driver_name VARCHAR(100),
    manager_name VARCHAR(100),
    photo_urls TEXT[], -- Array of image URLs
    location VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

// 人员配置表（司机/库管）- 2026-01-14 00:00:00
const createPersonnelTableSql = `
CREATE TABLE IF NOT EXISTS warehouse_personnel (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    role VARCHAR(20) NOT NULL, -- 'DRIVER' | 'MANAGER'
    name VARCHAR(100) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
`;

// 迁移脚本：添加新字段（如果表已存在）- 2025-01-27
const migrationSql = `
-- 添加新字段（如果不存在）
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'warehouse_movements' AND column_name = 'box_count') THEN
        ALTER TABLE warehouse_movements ADD COLUMN box_count INTEGER DEFAULT 0;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'warehouse_movements' AND column_name = 'sku') THEN
        ALTER TABLE warehouse_movements ADD COLUMN sku VARCHAR(200);
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'warehouse_movements' AND column_name = 'tracking_number') THEN
        ALTER TABLE warehouse_movements ADD COLUMN tracking_number VARCHAR(200);
    END IF;
END $$;
`;

async function setup() {
    try {
        await client.connect();
        console.log('Connected to database.');

        await client.query(createTableSql);
        console.log('Table warehouse_movements created (if not exists).');

        await client.query(createPersonnelTableSql);
        console.log('Table warehouse_personnel created (if not exists).');

        // 执行迁移脚本 - 2025-01-27
        await client.query(migrationSql);
        console.log('Migration completed (new fields added if needed).');

        // 种子数据：如果 personnel 表为空，插入默认司机/库管（可在桌面端管理修改）- 2026-01-14 00:00:00
        const personnelCountRes = await client.query('SELECT COUNT(*) FROM warehouse_personnel');
        const personnelCount = parseInt(personnelCountRes.rows[0].count, 10);
        if (personnelCount === 0) {
            await client.query(
                `INSERT INTO warehouse_personnel (role, name, sort_order) VALUES 
                 ('DRIVER', 'John Doe', 1),
                 ('DRIVER', 'Mike Smith', 2),
                 ('DRIVER', 'Sarah Jones', 3),
                 ('MANAGER', 'Admin Alice', 1),
                 ('MANAGER', 'Manager Bob', 2)`
            );
            console.log('Seeded warehouse_personnel with default names.');
        }

        // Verify by selecting count
        const res = await client.query('SELECT count(*) from warehouse_movements');
        console.log('Current record count:', res.rows[0].count);

    } catch (err) {
        console.error('Database setup failed:', err);
    } finally {
        await client.end();
    }
}

setup();
