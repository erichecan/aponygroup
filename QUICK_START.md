# 快速开始 - GCP 部署指南（免费层优化）

> 💡 **免费层配置**: 本指南使用 GCP 免费层优化配置，适合低到中等流量网站。详细说明请查看 `FREE_TIER_SETUP.md`

## 📋 前置要求

1. **安装 Google Cloud SDK**
   ```bash
   # macOS
   brew install google-cloud-sdk
   
   # 或访问: https://cloud.google.com/sdk/docs/install
   ```

2. **登录 GCP**
   ```bash
   gcloud auth login
   gcloud config set project 882380127696
   ```

3. **安装 Docker Desktop**
   - 下载: https://www.docker.com/products/docker-desktop

---

## 🚀 快速部署（3 步）

### 方法 1: 使用部署脚本（推荐）

```bash
# 1. 设置 API Key（可选，也可稍后设置）
export GEMINI_API_KEY="your_gemini_api_key_here"

# 2. 运行部署脚本
./deploy.sh

# 3. 完成！脚本会显示服务 URL
```

### 方法 2: 手动部署（免费层配置）

```bash
# 1. 启用 API 和创建 Artifact Registry
gcloud services enable artifactregistry.googleapis.com --project=882380127696
gcloud artifacts repositories create apony-website \
  --repository-format=docker \
  --location=asia-east1 \
  --project=882380127696

# 2. 配置 Docker 认证
gcloud auth configure-docker asia-east1-docker.pkg.dev

# 3. 构建并推送镜像
docker build -t asia-east1-docker.pkg.dev/882380127696/apony-website/apony-website:latest .
docker push asia-east1-docker.pkg.dev/882380127696/apony-website/apony-website:latest

# 4. 部署到 Cloud Run（免费层配置：256Mi, 0.5 CPU）
gcloud run deploy apony-website \
  --image asia-east1-docker.pkg.dev/882380127696/apony-website/apony-website:latest \
  --platform managed \
  --region asia-east1 \
  --allow-unauthenticated \
  --port 80 \
  --memory 256Mi \
  --cpu 0.5 \
  --min-instances 0 \
  --max-instances 5 \
  --set-env-vars GEMINI_API_KEY=your_gemini_api_key_here

# 5. 获取服务 URL
gcloud run services describe apony-website \
  --region asia-east1 \
  --format 'value(status.url)'
```

---

## 🌐 配置域名

### 步骤 1: 在 GCP 控制台配置

1. 访问: https://console.cloud.google.com/run/domains?project=882380127696
2. 点击"添加映射"
3. 输入您的域名（例如：`www.apony.com`）
4. 选择服务：`apony-website`
5. 按照提示验证域名

### 步骤 2: 在域名注册商配置 DNS

根据 GCP 提供的 DNS 记录，添加以下记录：

**示例（GoDaddy/Namecheap）:**
```
类型: A
名称: @
值: [GCP 提供的 IP 地址]
TTL: 3600

类型: CNAME
名称: www
值: [GCP 提供的 CNAME 值]
TTL: 3600
```

**详细步骤请查看**: `DEPLOYMENT.md` 第四部分

---

## ⚙️ 设置 API Key（如果部署时未设置）

```bash
gcloud run services update apony-website \
  --region asia-east1 \
  --update-env-vars GEMINI_API_KEY=your_api_key_here
```

---

## 📝 常用命令

### 查看服务状态
```bash
gcloud run services describe apony-website \
  --region asia-east1
```

### 查看日志
```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=apony-website" \
  --limit 50
```

### 更新服务
```bash
# 重新构建并推送镜像后
gcloud run services update apony-website \
  --image gcr.io/882380127696/apony-website:latest \
  --region asia-east1
```

---

## ⚠️ 重要提示

1. **免费层配置**: 当前配置已优化为免费层使用（256Mi 内存，0.5 CPU）。每月免费额度：200 万请求，360,000 GB-秒内存，180,000 vCPU-秒。详细说明请查看 `FREE_TIER_SETUP.md`

2. **API Key 安全**: 当前配置中，API key 会作为环境变量存储在 Cloud Run 中。虽然不会暴露在前端代码中，但建议使用 [Secret Manager](https://cloud.google.com/secret-manager) 存储敏感信息。

3. **成本**: Cloud Run 有免费额度，超出后按使用量计费。当前配置（最小实例 0）在无流量时不产生费用。低到中等流量网站可以完全免费运行。

4. **DNS 传播**: 域名配置后，DNS 记录可能需要几分钟到 48 小时才能生效。

5. **冷启动**: 由于最小实例设置为 0，首次请求可能有 1-3 秒冷启动延迟。如果希望消除冷启动，可设置最小实例 = 1（会产生少量费用）。

---

## 🆘 遇到问题？

查看详细文档: `DEPLOYMENT.md`

或检查：
- [Cloud Run 文档](https://cloud.google.com/run/docs)
- [GCP 支持](https://cloud.google.com/support)

