# 新闻抓取频率更新：从每天改为每周

**更新时间**: 2025-01-27  
**状态**: ✅ **已完成**

---

## 📋 更新摘要

新闻抓取系统已从**每天执行**改为**每周执行**，以减少不必要的资源消耗，同时保持新闻内容的时效性。

---

## 🔄 主要变更

### 1. 抓取频率

- **之前**: 每天执行一次
- **现在**: 每周执行一次（每周一 UTC 02:00，北京时间 10:00）

### 2. 抓取配置

- **daysBack**: 从 7 天改为 14 天（覆盖一周的新闻）
- **maxItems**: 从 20 条改为 30 条（每周汇总更多新闻）
- **调度时间**: `0 2 * * 1`（每周一 UTC 02:00）

### 3. 调度任务名称

- **之前**: `fetch-news-daily`
- **现在**: `fetch-news-weekly`

---

## 📝 更新的文件

### 脚本文件

1. **scripts/fetch-news.mjs**
   - 注释更新：从"每天"改为"每周"
   - daysBack: 7 → 14
   - maxItems: 20 → 30

2. **scripts/fetch-chwang-news.mjs**
   - 默认 daysBack: 7 → 14
   - 默认 maxItems: 20 → 30

### 部署文件

3. **functions/news-fetcher/deploy.sh**
   - 调度任务名称：`fetch-news-daily` → `fetch-news-weekly`
   - 调度时间：`0 2 * * *` → `0 2 * * 1`
   - 描述更新为"每周自动抓取"

4. **functions/news-fetcher/index.js**
   - 注释更新：从"每天"改为"每周"

5. **functions/news-fetcher/package.json**
   - 描述更新：`daily` → `weekly`

### 文档文件

6. **NEWS_FETCHER_README.md**
   - 所有"每天"改为"每周"
   - 调度命令更新
   - 调用次数更新（30次/月 → 4次/月）

7. **NEWS_FETCHER_QUICKSTART.md**
   - 功能描述更新
   - 调度时间说明更新
   - Cron 格式示例更新

---

## ⚙️ 新配置详情

### Cloud Scheduler 配置

```bash
# 任务名称
JOB_NAME="fetch-news-weekly"

# 调度时间（每周一 UTC 02:00，北京时间 10:00）
--schedule="0 2 * * 1"

# 描述
--description="每周自动抓取新闻（每周一 UTC 02:00，北京时间 10:00）"
```

### 新闻源配置

```javascript
{
  name: '出海网 - 跨境物流新闻',
  enabled: true,
  maxItems: 30,      // 每周最多 30 条
  daysBack: 14,      // 抓取最近 14 天
  filter: true
}
```

---

## 📊 影响分析

### 优势

1. **减少资源消耗**
   - 从每月 30 次调用减少到 4 次
   - 降低 Cloud Function 执行成本

2. **保持内容新鲜度**
   - 抓取最近 14 天的新闻，确保覆盖一周
   - 每周汇总，内容更全面

3. **降低服务器压力**
   - 减少对目标网站的请求频率
   - 更符合爬虫礼仪

### 时间安排

- **执行时间**: 每周一 UTC 02:00（北京时间 10:00）
- **抓取范围**: 最近 14 天的新闻
- **预期结果**: 每周约 20-30 条物流相关新闻

---

## 🚀 部署说明

### 如果已部署旧的调度任务

需要更新或删除旧的调度任务：

```bash
# 删除旧的每日任务（如果存在）
gcloud scheduler jobs delete fetch-news-daily \
  --location=asia-east1 \
  --project=882380127696

# 部署新的每周任务
cd functions/news-fetcher
./deploy.sh
```

### 如果是新部署

直接运行部署脚本即可：

```bash
cd functions/news-fetcher
./deploy.sh
```

脚本会自动创建 `fetch-news-weekly` 任务。

---

## ✅ 验证步骤

### 1. 检查调度任务

```bash
gcloud scheduler jobs describe fetch-news-weekly \
  --location=asia-east1 \
  --project=882380127696
```

### 2. 手动测试

```bash
# 获取函数 URL
FUNCTION_URL=$(gcloud functions describe fetch-news \
  --gen2 \
  --region asia-east1 \
  --format 'value(serviceConfig.uri)' \
  --project 882380127696)

# 手动触发测试
curl $FUNCTION_URL
```

### 3. 查看日志

```bash
gcloud functions logs read fetch-news \
  --gen2 \
  --region asia-east1 \
  --limit 50 \
  --project 882380127696
```

---

## 📅 Cron 格式说明

- `0 2 * * 1` = 每周一 02:00 UTC
- `0 2 * * 0` = 每周日 02:00 UTC
- `0 10 * * 1` = 每周一 10:00 UTC

**当前配置**: `0 2 * * 1`（每周一 UTC 02:00 = 北京时间 10:00）

---

## 🔄 如需改回每天

如果将来需要改回每天执行：

1. 修改 `scripts/fetch-news.mjs`:
   ```javascript
   daysBack: 7  // 改回 7 天
   maxItems: 20  // 改回 20 条
   ```

2. 修改 `functions/news-fetcher/deploy.sh`:
   ```bash
   JOB_NAME="fetch-news-daily"
   --schedule="0 2 * * *"  // 每天
   ```

3. 重新部署

---

## 📝 总结

✅ 所有配置已更新为每周执行  
✅ 调度任务名称改为 `fetch-news-weekly`  
✅ 抓取范围扩展到 14 天  
✅ 最大条数增加到 30 条  
✅ 所有文档已同步更新  

---

**更新完成时间**: 2025-01-27  
**状态**: ✅ **已完成**

