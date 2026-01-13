# 新闻自动抓取系统使用指南

## 概述

这个系统每周自动抓取物流行业相关新闻，并更新网站上的新闻内容。

## 架构说明

### 组件

1. **新闻抓取脚本** (`scripts/fetch-news.mjs`)
   - 从多个新闻源抓取新闻
   - 自动分类和格式化
   - 保存到 JSON 文件

2. **数据存储** (`public/data/news.json`)
   - JSON 格式存储新闻数据
   - 前端可以直接读取

3. **Cloud Function** (`functions/news-fetcher/`)
   - 在 GCP 上运行的抓取函数
   - 可以通过 HTTP 或 Cloud Scheduler 触发

4. **Cloud Scheduler**
   - 每周自动触发抓取任务（每周一执行）

## 本地测试

### 1. 安装依赖

```bash
npm install
```

### 2. 运行抓取脚本

```bash
node scripts/fetch-news.mjs
```

这会生成示例新闻数据并保存到 `public/data/news.json`。

### 3. 配置真实新闻源

编辑 `scripts/fetch-news.mjs`，在 `NEWS_SOURCES` 数组中添加真实的 RSS feed 地址：

```javascript
const NEWS_SOURCES = [
  {
    name: '物流行业新闻',
    type: 'rss',
    url: 'https://your-news-source.com/rss', // 替换为真实地址
    enabled: true
  }
];
```

## GCP 部署

### 方法 1: 使用 Cloud Function（推荐）

#### 步骤 1: 部署 Cloud Function

```bash
cd functions/news-fetcher
gcloud functions deploy fetch-news \
  --gen2 \
  --runtime nodejs20 \
  --region asia-east1 \
  --entry-point fetchNews \
  --trigger-http \
  --allow-unauthenticated \
  --project 882380127696 \
  --timeout 540s \
  --memory 256Mi
```

#### 步骤 2: 配置 Cloud Scheduler

创建一个每周执行的调度任务：

```bash
# 获取 Cloud Function 的 URL
FUNCTION_URL=$(gcloud functions describe fetch-news \
  --gen2 \
  --region asia-east1 \
  --format 'value(serviceConfig.uri)' \
  --project 882380127696)

# 创建调度任务（每周一 UTC 时间 02:00 执行，北京时间 10:00）
gcloud scheduler jobs create http fetch-news-weekly \
  --schedule="0 2 * * 1" \
  --uri="$FUNCTION_URL" \
  --http-method=GET \
  --location=asia-east1 \
  --project=882380127696 \
  --description="每周自动抓取新闻（每周一 UTC 02:00）" \
  --time-zone="UTC"
```

### 方法 2: 使用 Cloud Run Job（替代方案）

如果 Cloud Function 不适合，可以使用 Cloud Run Job：

#### 步骤 1: 创建 Dockerfile

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY scripts/fetch-news.mjs .
RUN apk add --no-cache git
CMD ["node", "fetch-news.mjs"]
```

#### 步骤 2: 部署 Job

```bash
gcloud run jobs deploy news-fetcher \
  --image gcr.io/882380127696/news-fetcher \
  --region asia-east1 \
  --project 882380127696
```

#### 步骤 3: 配置调度

```bash
gcloud scheduler jobs create http fetch-news-weekly \
  --schedule="0 2 * * 1" \
  --uri="https://asia-east1-run.googleapis.com/apis/run.googleapis.com/v1/namespaces/882380127696/jobs/news-fetcher:run" \
  --http-method=POST \
  --oauth-service-account-email=your-service-account@project.iam.gserviceaccount.com \
  --location=asia-east1 \
  --project=882380127696
```

## 配置新闻源

### RSS Feed 源

1. 找到物流行业相关的 RSS feed 地址
2. 编辑 `scripts/fetch-news.mjs` 中的 `NEWS_SOURCES`
3. 设置 `enabled: true`

### 新闻 API

可以扩展脚本支持新闻 API，例如：
- NewsAPI
- Google News RSS
- 行业特定新闻网站 RSS

## 数据格式

新闻数据以 JSON 格式存储：

```json
{
  "lastUpdated": "2025-01-27T10:00:00.000Z",
  "totalCount": 10,
  "news": [
    {
      "id": "news-1234567890-example-title",
      "title": "新闻标题",
      "summary": "新闻摘要",
      "content": "新闻完整内容",
      "category": "industry",
      "publishDate": "2025-01-27",
      "imageUrl": "https://example.com/image.jpg"
    }
  ]
}
```

## 前端集成

前端代码已经支持从 `/data/news.json` 读取新闻数据。如果需要更改数据源路径，请修改 `pages/News.tsx`。

## 监控和维护

### 查看日志

```bash
# Cloud Function 日志
gcloud functions logs read fetch-news \
  --gen2 \
  --region asia-east1 \
  --limit 50 \
  --project 882380127696

# Cloud Scheduler 执行历史
gcloud scheduler jobs describe fetch-news-weekly \
  --location=asia-east1 \
  --project=882380127696
```

### 手动触发

```bash
# 手动调用 Cloud Function
curl https://asia-east1-882380127696.cloudfunctions.net/fetch-news
```

## 故障排查

1. **抓取失败**
   - 检查网络连接
   - 验证 RSS feed 地址是否可访问
   - 查看 Cloud Function 日志

2. **数据未更新**
   - 检查 Cloud Scheduler 是否正确配置
   - 验证函数权限
   - 查看执行历史

3. **前端无法读取**
   - 确认 JSON 文件路径正确
   - 检查文件权限
   - 验证 JSON 格式是否正确

## 安全建议

1. 如果使用 Cloud Function，建议：
   - 启用身份验证
   - 使用 Secret Manager 存储 API keys
   - 限制函数访问权限

2. 新闻源验证：
   - 验证 RSS feed 来源可靠性
   - 过滤不当内容
   - 检查内容版权

## 成本估算

- Cloud Function（免费层）：
  - 每月前 200 万次调用免费
  - 每周 1 次调用，每月约 4 次，完全免费

- Cloud Scheduler：
  - 每月前 3 个作业免费
  - 本系统使用 1 个作业，免费

- Cloud Storage（如果使用）：
  - 每月 5GB 免费存储
  - JSON 文件很小，基本免费

## 下一步优化

1. 添加更多新闻源
2. 实现内容去重和智能分类
3. 添加图片抓取功能
4. 支持多语言新闻
5. 实现内容审核和过滤

