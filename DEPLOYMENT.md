# GCP 部署指南

## 项目信息
- **GCP 项目 ID**: 882380127696
- **项目名称**: AponyGroup Global Logistics & Warehousing
- **部署方式**: Cloud Run

---

## 一、GCP 控制台配置步骤

### 1. 启用必要的 API

在 GCP 控制台中启用以下 API：

1. 访问 [GCP API 库](https://console.cloud.google.com/apis/library?project=882380127696)
2. 启用以下 API：
   - **Cloud Run API**
   - **Cloud Build API**
   - **Container Registry API** 或 **Artifact Registry API**
   - **Cloud Resource Manager API**

### 2. 设置计费账户

确保项目已关联计费账户：
- 访问 [计费设置](https://console.cloud.google.com/billing?project=882380127696)

---

## 二、本地部署步骤

### 前置要求

1. 安装 [Google Cloud SDK](https://cloud.google.com/sdk/docs/install)
2. 安装 Docker Desktop（用于本地测试）

### 步骤 1: 登录 GCP

```bash
gcloud auth login
gcloud config set project 882380127696
```

### 步骤 2: 配置 Docker 认证

```bash
gcloud auth configure-docker
```

### 步骤 3: 构建并推送镜像

```bash
# 构建 Docker 镜像
docker build -t gcr.io/882380127696/apony-website:latest .

# 推送镜像到 GCP Container Registry
docker push gcr.io/882380127696/apony-website:latest
```

### 步骤 5: 部署到 Cloud Run

```bash
gcloud run deploy apony-website \
  --image gcr.io/882380127696/apony-website:latest \
  --platform managed \
  --region asia-east1 \
  --allow-unauthenticated \
  --port 80 \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10
```

### 步骤 6: 获取服务 URL

部署完成后，会显示服务 URL，例如：
```
https://apony-website-xxxxx-xx.a.run.app
```

---

## 三、使用 Cloud Build 自动部署（推荐）

### 步骤 1: 连接 GitHub 仓库

1. 访问 [Cloud Build 触发器](https://console.cloud.google.com/cloud-build/triggers?project=882380127696)
2. 点击"创建触发器"
3. 连接 GitHub 仓库：`https://github.com/erichecan/aponygroup.git`
4. 选择分支：`main`
5. 配置文件：`cloudbuild.yaml`
6. 创建触发器

现在，每次推送到 `main` 分支时，会自动构建和部署。

---

## 四、域名配置步骤

### 选项 1: 使用 Cloud Run 自定义域名（推荐）

#### 步骤 1: 验证域名所有权

1. 访问 [Cloud Run 域名映射](https://console.cloud.google.com/run/domains?project=882380127696)
2. 点击"添加映射"
3. 输入您的域名（例如：`www.apony.com`）
4. 选择 Cloud Run 服务：`apony-website`
5. 按照提示验证域名所有权

#### 步骤 2: 在域名注册商配置 DNS

根据 GCP 提供的 DNS 记录，在您的域名注册商处添加以下记录：

**A 记录**（IPv4）：
```
类型: A
名称: @ (或 www)
值: [GCP 提供的 IP 地址]
TTL: 3600
```

**AAAA 记录**（IPv6，可选）：
```
类型: AAAA
名称: @ (或 www)
值: [GCP 提供的 IPv6 地址]
TTL: 3600
```

**CNAME 记录**（如果使用子域名）：
```
类型: CNAME
名称: www
值: [GCP 提供的 CNAME 值]
TTL: 3600
```

### 选项 2: 使用 Cloud Load Balancer（适合生产环境）

如果需要更高级的负载均衡和 SSL 管理：

1. 访问 [Cloud Load Balancer](https://console.cloud.google.com/net-services/loadbalancing/list/loadBalancers?project=882380127696)
2. 创建 HTTP(S) 负载均衡器
3. 配置后端服务指向 Cloud Run
4. 配置 SSL 证书
5. 配置 DNS 指向负载均衡器 IP

---

## 五、常见域名注册商 DNS 配置示例

### GoDaddy

1. 登录 GoDaddy 账户
2. 进入"我的产品" > "DNS"
3. 添加记录：
   - **A 记录**: `@` → `[GCP IP]`
   - **CNAME**: `www` → `[GCP CNAME]`

### Namecheap

1. 登录 Namecheap
2. 进入"域名列表" > 选择域名 > "高级 DNS"
3. 添加记录：
   - **A 记录**: `@` → `[GCP IP]`
   - **CNAME**: `www` → `[GCP CNAME]`

### Cloudflare

1. 登录 Cloudflare
2. 选择域名 > "DNS" > "记录"
3. 添加记录：
   - **A 记录**: `@` → `[GCP IP]` (代理关闭)
   - **CNAME**: `www` → `[GCP CNAME]` (代理关闭)

**注意**: 如果使用 Cloudflare，建议：
- 关闭 Cloudflare 代理（橙色云），直接指向 GCP
- 或在 Cloudflare 中配置 SSL，使用"完全"模式

---

## 六、验证部署

### 检查服务状态

```bash
gcloud run services describe apony-website \
  --region asia-east1 \
  --project 882380127696
```

### 测试访问

```bash
# 获取服务 URL
SERVICE_URL=$(gcloud run services describe apony-website \
  --region asia-east1 \
  --format 'value(status.url)')

# 测试访问
curl $SERVICE_URL
```

---

## 七、监控和日志

### 查看日志

```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=apony-website" \
  --limit 50 \
  --project 882380127696
```

### 查看指标

访问 [Cloud Run 控制台](https://console.cloud.google.com/run?project=882380127696) 查看：
- 请求数量
- 响应时间
- 错误率
- 实例数量

---

## 八、成本优化

### Cloud Run 定价

- **免费额度**: 每月 200 万请求，360,000 GB-秒内存，180,000 vCPU-秒
- **超出后**: 按使用量计费

### 优化建议

1. 设置最小实例数为 0（无流量时不运行）
2. 合理设置内存和 CPU（当前配置：512Mi, 1 CPU）
3. 使用 CDN 缓存静态资源（Cloud CDN）

---

## 九、故障排查

### 常见问题

1. **部署失败**
   - 检查 API 是否已启用
   - 检查 Docker 镜像是否正确构建
   - 查看 Cloud Build 日志

2. **域名无法访问**
   - 检查 DNS 记录是否正确
   - 等待 DNS 传播（最多 48 小时）
   - 使用 `dig` 或 `nslookup` 验证 DNS

3. **API Key 错误**
   - 检查环境变量是否正确设置
   - 验证 Secret Manager 中的密钥

---

## 十、安全建议

1. ✅ 使用 Secret Manager 存储 API key
2. ✅ 启用 Cloud Run 的 IAM 认证（如果需要）
3. ✅ 配置 HTTPS（Cloud Run 自动提供）
4. ✅ 定期更新依赖包
5. ✅ 监控异常访问

---

## 联系支持

如有问题，请查看：
- [Cloud Run 文档](https://cloud.google.com/run/docs)
- [Cloud Build 文档](https://cloud.google.com/build/docs)
- [GCP 支持](https://cloud.google.com/support)

