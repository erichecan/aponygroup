#!/bin/bash
# GCP 部署脚本
# Created: 2025-01-27
# Project ID: 882380127696

set -e

PROJECT_ID="882380127696"
SERVICE_NAME="apony-website"
REGION="asia-east1"
# 使用 Artifact Registry 而不是 Container Registry（免费层更友好）
REPOSITORY="apony-website"
IMAGE_NAME="asia-east1-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${SERVICE_NAME}"

echo "🚀 开始部署 AponyGroup 网站到 GCP Cloud Run..."
echo ""

# 检查是否已登录
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "❌ 未登录 GCP，请先运行: gcloud auth login"
    exit 1
fi

# 设置项目
echo "📋 设置 GCP 项目..."
gcloud config set project ${PROJECT_ID}

# 检查必要的 API 是否已启用
echo "🔍 检查必要的 API..."
APIS=(
    "run.googleapis.com"
    "cloudbuild.googleapis.com"
    "artifactregistry.googleapis.com"
)

for api in "${APIS[@]}"; do
    if ! gcloud services list --enabled --filter="name:${api}" --format="value(name)" | grep -q .; then
        echo "⚠️  启用 API: ${api}"
        gcloud services enable ${api} --project=${PROJECT_ID}
    fi
done

# 配置 Docker 认证（Artifact Registry）
echo "🐳 配置 Docker 认证..."
gcloud auth configure-docker asia-east1-docker.pkg.dev --quiet

# 检查并创建 Artifact Registry 仓库（如果不存在）
echo "📦 检查 Artifact Registry 仓库..."
if ! gcloud artifacts repositories describe ${REPOSITORY} \
    --location=${REGION} \
    --project=${PROJECT_ID} &>/dev/null; then
    echo "📦 创建 Artifact Registry 仓库..."
    gcloud artifacts repositories create ${REPOSITORY} \
        --repository-format=docker \
        --location=${REGION} \
        --description="AponyGroup website Docker images" \
        --project=${PROJECT_ID}
fi

# 构建 Docker 镜像
echo "🔨 构建 Docker 镜像..."
docker build -t ${IMAGE_NAME}:latest .

# 推送镜像
echo "📤 推送镜像到 GCP Container Registry..."
docker push ${IMAGE_NAME}:latest

# 部署到 Cloud Run（免费层优化配置）
echo "🚀 部署到 Cloud Run（免费层配置：256Mi 内存，0.5 CPU）..."
gcloud run deploy ${SERVICE_NAME} \
    --image ${IMAGE_NAME}:latest \
    --platform managed \
    --region ${REGION} \
    --allow-unauthenticated \
    --port 80 \
    --memory 256Mi \
    --cpu 0.5 \
    --min-instances 0 \
    --max-instances 5 \
    --timeout 300 \
    --concurrency 80 \
    --project ${PROJECT_ID}

# 获取服务 URL
SERVICE_URL=$(gcloud run services describe ${SERVICE_NAME} \
    --region ${REGION} \
    --format 'value(status.url)' \
    --project ${PROJECT_ID})

echo ""
echo "✅ 部署完成！"
echo "🌐 服务 URL: ${SERVICE_URL}"
echo ""
echo "📝 下一步："
echo "   1. 在 GCP 控制台配置自定义域名"
echo "   2. 在域名注册商处配置 DNS 记录"
echo "   3. 查看部署文档: cat DEPLOYMENT.md"
echo ""

