# 新闻自动抓取系统 - 快速开始

## 📋 功能概述

这个系统每周自动抓取物流行业相关新闻，并自动更新网站上的新闻内容。

## 🚀 快速开始（3步）

### 步骤 1: 本地测试

```bash
# 运行抓取脚本（会生成示例数据）
node scripts/fetch-news.mjs

# 查看生成的新闻数据
cat public/data/news.json
```

### 步骤 2: 配置真实新闻源（可选）

编辑 `scripts/fetch-news.mjs`，在 `NEWS_SOURCES` 数组中添加真实的 RSS feed：

```javascript
const NEWS_SOURCES = [
  {
    name: '物流行业新闻',
    type: 'rss',
    url: 'https://your-news-source.com/rss', // 替换为真实地址
    enabled: true  // 启用此源
  }
];
```

### 步骤 3: 部署到 GCP（自动执行）

```bash
cd functions/news-fetcher
./deploy.sh
```

这个脚本会：
- 部署 Cloud Function
- 配置 Cloud Scheduler（每周一 UTC 02:00 执行，北京时间 10:00）
- 设置必要的权限

## 📁 文件结构

```
├── scripts/
│   └── fetch-news.mjs          # 新闻抓取脚本
├── functions/
│   └── news-fetcher/           # Cloud Function
│       ├── index.js            # 函数入口
│       ├── package.json        # 依赖
│       └── deploy.sh           # 部署脚本
├── public/
│   └── data/
│       └── news.json           # 新闻数据存储
├── services/
│   └── newsService.ts          # 前端新闻服务
└── pages/
    └── News.tsx                # 新闻页面（已更新支持动态加载）
```

## 🔧 配置选项

### 修改执行时间

编辑 `functions/news-fetcher/deploy.sh`，修改调度时间：

```bash
--schedule="0 2 * * 1"  # 每周一 UTC 02:00（北京时间 10:00）
```

Cron 格式说明：
- `0 2 * * 1` = 每周一 02:00 UTC（推荐）
- `0 2 * * 0` = 每周日 02:00 UTC
- `0 10 * * 1` = 每周一 10:00 UTC
- `0 2 * * *` = 每天 02:00 UTC（不推荐，频率过高）

### 添加更多新闻源

在 `scripts/fetch-news.mjs` 中添加：

```javascript
const NEWS_SOURCES = [
  {
    name: '源1',
    type: 'rss',
    url: 'https://source1.com/rss',
    enabled: true
  },
  {
    name: '源2',
    type: 'rss',
    url: 'https://source2.com/rss',
    enabled: true
  }
];
```

## 📊 数据格式

新闻数据以 JSON 格式存储，包含：

```json
{
  "lastUpdated": "2025-01-27T10:00:00.000Z",
  "totalCount": 10,
  "news": [
    {
      "id": "news-1234567890-title",
      "title": "新闻标题",
      "summary": "新闻摘要",
      "content": "完整内容",
      "category": "industry",
      "publishDate": "2025-01-27",
      "imageUrl": "https://..."
    }
  ]
}
```

## 🔍 监控和维护

### 查看日志

```bash
# Cloud Function 日志
gcloud functions logs read fetch-news \
  --gen2 \
  --region asia-east1 \
  --limit 50 \
  --project 882380127696
```

### 手动触发

```bash
# 获取函数 URL
FUNCTION_URL=$(gcloud functions describe fetch-news \
  --gen2 \
  --region asia-east1 \
  --format 'value(serviceConfig.uri)' \
  --project 882380127696)

# 手动调用
curl $FUNCTION_URL
```

### 查看调度任务

```bash
gcloud scheduler jobs describe fetch-news-weekly \
  --location=asia-east1 \
  --project=882380127696
```

## 💡 常见问题

**Q: 如何添加图片支持？**
A: 可以扩展 RSS 解析逻辑，从 `<enclosure>` 或 `<media:content>` 标签提取图片 URL。

**Q: 如何支持多语言新闻？**
A: 可以在抓取时添加语言标识，或创建不同语言的 JSON 文件。

**Q: 如何过滤不当内容？**
A: 可以在抓取后添加内容审核逻辑，或使用 AI 进行内容筛选。

**Q: 数据存储在哪里？**
A: 目前存储在 `public/data/news.json`，前端可以直接访问。未来可以迁移到数据库。

## 📝 下一步

1. ✅ 配置真实的新闻源 RSS feeds
2. ✅ 添加内容审核和过滤
3. ✅ 实现图片自动抓取
4. ✅ 添加多语言支持
5. ✅ 迁移到数据库存储（如果需要）

## 🔗 相关文档

- 详细文档：`NEWS_FETCHER_README.md`
- 部署指南：`DEPLOYMENT.md`
- GCP 项目 ID：882380127696

