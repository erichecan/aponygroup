# 图片资源指南

## 概述

本网站使用 Unsplash 提供的免费高质量图片。所有图片都通过 CDN 链接加载，无需手动下载。

## 当前使用的图片资源

### 首页 (Home)

#### Hero 背景图
- **主图**: `https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1920&q=80`
- **备用图**: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80`
- **描述**: 现代化仓库和物流场景

#### Why Choose Us 配图
- **主图**: `https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&q=80`
- **备用图**: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80`
- **描述**: 现代化仓库内部，整齐的货架

### 服务页面 (Services)

#### 仓储服务
- **主图**: `https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&q=80`
- **备用图**: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80`

#### 物流服务
- **主图**: `https://images.unsplash.com/photo-1605745341112-85968b19335b?w=1200&q=80`
- **备用图**: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80`

#### WMS 系统
- **主图**: `https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80`
- **备用图**: `https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80`

#### FBA 服务
- **主图**: `https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80`
- **备用图**: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80`

### 关于我们页面 (About)

#### 团队图片
- **主图**: `https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&q=80`
- **备用图**: `https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80`

#### 仓库设施
- **主图**: `https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80`
- **备用图**: `https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=1200&q=80`

### 案例页面 (Cases)

所有案例使用根据类别动态分配的图片：
- **清关服务**: 港口/物流场景
- **落地服务**: 仓库/物流场景
- **仓储服务**: 现代化仓库内部
- **运输服务**: 运输车辆/物流场景
- **综合解决方案**: 物流场景

### 新闻页面 (News)

根据新闻类别动态分配图片：
- **公司新闻**: 团队/办公室场景
- **行业动态**: 物流/仓储场景
- **政策法规**: 商务/文档场景
- **物流知识**: 数据分析/图表场景

## 如何替换为本地图片

如果您想使用本地图片而不是 CDN 链接，请按以下步骤操作：

### 1. 下载图片

访问 Unsplash 下载图片：
- 访问图片 URL（去掉参数）
- 点击下载按钮
- 保存到对应的目录

### 2. 目录结构

```
public/
  assets/
    hero/
      hero-background.jpg
      hero-why-choose.jpg
    services/
      warehousing.jpg
      logistics.jpg
      wms.jpg
      fba.jpg
    about/
      team.jpg
      warehouse.jpg
    cases/
      case-1.jpg
      case-2.jpg
      ...
    news/
      news-1.jpg
      news-2.jpg
      ...
```

### 3. 更新代码

在相应的组件文件中，将 CDN URL 替换为本地路径：

```typescript
// 替换前
src="https://images.unsplash.com/photo-xxx?w=1200&q=80"

// 替换后
src="/assets/hero/hero-background.jpg"
```

## 图片优化建议

### 尺寸建议

- **Hero 背景图**: 1920x1080px (16:9)
- **服务配图**: 1200x900px (4:3)
- **案例/新闻卡片**: 800x600px (4:3)
- **关于我们**: 1200x900px (4:3)

### 格式建议

- **优先使用**: WebP 格式（更好的压缩率）
- **备用格式**: JPG（兼容性更好）
- **透明背景**: PNG（如需要）

### 压缩工具

推荐使用以下工具压缩图片：
- [TinyPNG](https://tinypng.com/) - 在线压缩
- [Squoosh](https://squoosh.app/) - Google 的图片压缩工具
- [ImageOptim](https://imageoptim.com/) - Mac 应用

## 版权说明

所有使用的 Unsplash 图片都是免费可商用的，遵循 [Unsplash License](https://unsplash.com/license)：
- ✅ 可以免费使用
- ✅ 可以用于商业用途
- ✅ 无需署名（但建议）
- ✅ 可以修改

## 图片搜索关键词

如果您想寻找替代图片，可以使用以下关键词在 Unsplash 搜索：

- `warehouse` - 仓库
- `logistics` - 物流
- `shipping` - 运输
- `freight` - 货运
- `customs` - 海关
- `port` - 港口
- `truck` - 卡车
- `container` - 集装箱
- `supply chain` - 供应链
- `distribution` - 分销

## 更新日期

最后更新: 2024-12-19 15:45:00

