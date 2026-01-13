# 出海网 (chwang.com) 新闻源配置指南

## ✅ 结论：出海网非常适合作为新闻抓取来源！

### 📊 分析总结

#### 1. 内容相关性 ⭐⭐⭐⭐⭐
出海网的新闻内容与 AponyGroup 业务高度匹配：

- ✅ **物流行业新闻**: "深圳跨境物流业频现爆雷"、"万海503号货轮火灾后续"
- ✅ **政策法规**: "美财长贝森特：无论法院判决是何结果，均不影响关税实施"、"欧盟破获1.5亿元VAT欺诈走私案"
- ✅ **行业动态**: "中国E-bike加速出海"、"Shopee优选仓启动地址变更"
- ✅ **公司新闻**: "京东收购德国零售巨头CECONOMY"、"2025中国出海先锋TOP10榜单发布"

#### 2. 技术可行性 ✅✅✅

**优势**:
- ✅ 网站允许爬虫访问（robots.txt: `Allow: /`）
- ✅ **有专门的新闻 Sitemap**: `https://www.chwang.com/sitemap/news.xml`
- ✅ 包含大量新闻链接和更新时间（`<lastmod>`）
- ✅ 新闻详情页有清晰的元数据（title, description, publish time）

**参考链接**: [出海网新闻](https://www.chwang.com/news)

### 🚀 快速开始

#### 方法 1: 使用专用脚本（推荐）

```bash
# 测试抓取出海网新闻
node scripts/fetch-chwang-news.mjs
```

这会：
- 从 sitemap 获取最近 7 天的新闻链接
- 抓取最多 10 条新闻的详细内容
- 自动过滤物流相关新闻

#### 方法 2: 集成到主抓取脚本

在 `scripts/fetch-news.mjs` 中，已经添加了出海网配置：

```javascript
{
  name: '出海网 - 跨境物流新闻',
  type: 'sitemap',
  url: 'https://www.chwang.com/sitemap/news.xml',
  enabled: false,  // 设置为 true 启用
  source: 'chwang',
  filter: true,
  maxItems: 20
}
```

### 📋 配置选项

#### 启用出海网新闻源

编辑 `scripts/fetch-news.mjs`，找到 `NEWS_SOURCES` 配置：

```javascript
{
  name: '出海网 - 跨境物流新闻',
  type: 'sitemap',
  url: 'https://www.chwang.com/sitemap/news.xml',
  enabled: true,   // 改为 true
  source: 'chwang',
  filter: true,    // 只抓取物流相关新闻
  maxItems: 20,    // 每天最多 20 条
  daysBack: 7      // 只抓取最近 7 天
}
```

### 🔍 抓取流程

1. **从 Sitemap 获取链接**
   - 访问 `https://www.chwang.com/sitemap/news.xml`
   - 解析 XML 获取所有新闻 URL
   - 根据 `lastmod` 日期过滤最近 N 天的新闻

2. **访问新闻详情页**
   - 逐个访问新闻 URL
   - 从 HTML 元数据提取：
     - 标题 (og:title)
     - 摘要 (og:description)
     - 发布时间 (bytedance:published_time)
     - 图片 (og:image)

3. **数据转换**
   - 自动分类（policy/industry/company/knowledge）
   - 生成摘要
   - 转换为我们的 NewsItem 格式

4. **内容过滤**
   - 只保留与物流、跨境相关的新闻
   - 根据关键词过滤

### ⚠️ 注意事项

1. **请求频率**
   - 脚本已内置 1 秒延迟
   - 避免对服务器造成压力

2. **内容版权**
   - 建议在新闻内容中添加："来源：出海网 (chwang.com)"
   - 遵守网站使用条款

3. **错误处理**
   - 脚本已包含错误处理和重试逻辑
   - 单个新闻失败不会影响整体抓取

4. **内容过滤**
   - 默认只抓取物流相关新闻
   - 可以通过关键词列表调整过滤规则

### 📝 测试步骤

1. **测试 Sitemap 访问**
   ```bash
   curl -s "https://www.chwang.com/sitemap/news.xml" | head -50
   ```

2. **测试单个新闻页面**
   ```bash
   curl -s "https://www.chwang.com/news/199651177623" | grep -i "og:title"
   ```

3. **运行抓取脚本**
   ```bash
   node scripts/fetch-chwang-news.mjs
   ```

### 💡 优化建议

1. **增加更多新闻源**
   - 可以同时配置多个新闻源
   - 合并不同来源的新闻

2. **智能分类**
   - 根据标题和内容自动分类
   - 可以进一步优化分类算法

3. **内容去重**
   - 检查标题相似度
   - 避免重复新闻

4. **图片抓取**
   - 提取新闻配图
   - 可以下载并存储到本地

### ✅ 最终建议

**强烈推荐使用出海网作为新闻源！**

**理由**:
1. ✅ 内容高度相关
2. ✅ 有专门的 Sitemap（技术优势明显）
3. ✅ 更新频率高
4. ✅ 内容质量好
5. ✅ 网站结构清晰，易于抓取

**下一步**:
1. ✅ 测试抓取功能
2. ✅ 配置为每日自动抓取
3. ✅ 部署到生产环境

