# 移动端收发货管理系统产品需求文档 (PRD)

## 1. 项目概述 (Project Overview)
本产品旨在为物流中心提供一个极简、高效且具备高端视觉体验的移动端收发货记录工具。用户无需下载APP，只需通过扫码即可进入系统，快速完成收货（Inbound）或出货（Outbound）的数据录入。

**核心目标：**
- 提高现场操作效率。
- 确保数据实时精准录入数据库。
- 提供“UIUXProMax”级别的极致用户体验。

## 2. 用户角色 (User Roles)
- **库管人员 (Warehouse Manager)**: 负责现场收发货确认。
- **司机 (Driver)**: 负责货物运输。
- **管理员 (Admin)**: 后台查看数据。

## 3. 产品流程设计 (Product Flow)

### 3.1 进入系统 (Entry)
- **方式**: 物理环境（仓库门口/月台）张贴二维码。
- **动作**: 手机相机或微信扫码。
- **页面**: 打开移动端Web应用（PWA），显示欢迎页与核心入口。

### 3.2 业务流程 (Business Logic)

#### 第一步：类型选择 (Type Selection)
用户进入后，主界面展示两个巨大的、视觉差异化明显的卡片/按钮：
1.  **收货 (Inbound)**: 对应入库流程。
2.  **出货 (Outbound)**: 对应出库流程。

#### 第二步：详细分类 (Category/Carrier)
根据第一步的选择，系统动态展示二级选项：
- **若选“收货”**:
    - **新品 (New Product)**: 常规入库。
    - **退货 (Return)**:以此处理退货逻辑。
- **若选“出货”**:
    - **物流公司选择**:
        - StraightShip
        - Day&Ross
        - Other (其他)

#### 第三步：货物数量 (Quantity)
采用大数字键盘或步进器（Stepper）设计，快速录入：
- **托数 (Pallets)**: 输入数字。
- **笼数 (Cages)**: 输入数字。

#### 第四步：人员信息 (Personnel)
系统预置常用人员列表，支持快速点选，避免打字：
- **司机 (Driver)**: 显示常用司机头像/名字列表 (Chips/Grid layout)。
- **库管 (Warehouse Manager)**: 显示当前值班或常用库管名字。
*注：也应提供“其他”或手动输入选项以备不时之需。*

#### 第五步：拍照留底 (Photo Evidence)
- **功能**: 调用手机摄像头或从相册选择。
- **场景**: 拍摄货物堆叠状态、单据或车牌。

#### 第六步：提交与记录 (Submission)
- **自动记录**:
    - 系统时间 (Timestamp)。
    - 地理位置 (可选，便于验证)。
- **反馈**: 提交成功后的高质感动画反馈。

## 4. 功能需求详情 (Functional Requirements)

| 模块 | 功能点 | 描述 | 优先级 |
| :--- | :--- | :--- | :--- |
| **入口** | 扫码访问 | 支持多端扫码（微信、相机），无需登录或简单设备指纹认证 | P0 |
| **收货** | 类型选择 | 区分新品与退货 | P0 |
| **出货** | 物流商选择 | 预设StraightShip, Day&Ross，支持扩展 | P0 |
| **数据** | 数量录入 | 托数、笼数，支持小数或整数校验 | P0 |
| **人员** | 快捷选择 | 从后端获取常用司机/库管列表，支持搜索/点选 | P1 |
| **多媒体**| 拍照上传 | 图片压缩上传，关联单据ID | P1 |
| **系统** | 自动时间 | 后端记录创建时间 (created_at) | P0 |

## 5. 数据存储设计 (Database Draft)

建议新增 `warehouse_movements` 表记录核心数据：

```sql
CREATE TABLE warehouse_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(20) NOT NULL, -- 'INBOUND' or 'OUTBOUND'
    sub_type VARCHAR(50), -- 'NEW_PRODUCT', 'RETURN', 'STRAIGHTSHIP', 'DAY_ROSS', 'OTHER'
    pallet_count INTEGER DEFAULT 0,
    cage_count INTEGER DEFAULT 0,
    driver_name VARCHAR(100),
    manager_name VARCHAR(100),
    photo_urls TEXT[], -- Array of image URLs
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 6. UI/UX ProMax 设计规范 (UX Guidelines)

本产品必须遵循 **UIUXProMax** 标准，打造高端、现代的视觉语言：

1.  **Glassmorphism (玻璃拟态)**:
    - 卡片和浮层背景采用高斯模糊与半透明度（Backdrop Filter），营造空间感。
    - 细腻的白色边框（1px border with localized opacity）。

2.  **色彩体系 (Color Palette)**:
    - **Inbound**: 采用富有生命力的 Teal/Emerald 渐变。
    - **Outbound**: 采用充满活力的 Indigo/Violet 渐变。
    - **背景**: 深色模式优先 (Dark Mode First)，深灰/午夜蓝背景，突出内容。

3.  **交互动画 (Micro-interactions)**:
    - 页面切换使用 Slide Over 或 Fade Scale 效果。
    - 按钮点击具有 Ripple 或 Scale 反馈。
    - 成功提交展示 Lottie 动画（如对勾绘制动画）。

4.  **易用性 (Accessibility)**:
    - **大触控区**: 考虑到现场操作可能戴手套，按钮高度至少 56px。
    - **高对比度**: 关键文字与背景对比度符合 WCAGAA 标准。

## 7. 开发计划 (Next Steps)
1.  **确认文档**: 用户确认本PRD无误。
2.  **设计原型**: 产出关键页面的高保真UI图（可使用 `generate_image` 辅助）。
3.  **前端开发**: 使用 React + Tailwind (或其他CSS方案) 开发移动端H5。
4.  **后端对接**: 创建API接口与数据库表。

---
请确认以上需求细节，确认无误后将开始进入开发阶段。
