#!/bin/bash
# 部署移动端收发货系统后端（logistics-api）Cloud Function 脚本
# 时间戳：2026-01-14 13:44:52

set -e

PROJECT_ID="gen-lang-client-0364422903"
FUNCTION_NAME="logistics-api"
REGION="asia-east1"

echo "🚀 开始部署 Logistics API Cloud Function..."
echo ""

# 检查是否已登录
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
  echo "❌ 未登录 GCP，请先运行: gcloud auth login"
  exit 1
fi

echo "📋 设置 GCP 项目..."
gcloud config set project "${PROJECT_ID}"

echo "🔍 检查必要的 API..."
gcloud services enable cloudfunctions.googleapis.com --project="${PROJECT_ID}" >/dev/null
gcloud services enable cloudbuild.googleapis.com --project="${PROJECT_ID}" >/dev/null
gcloud services enable run.googleapis.com --project="${PROJECT_ID}" >/dev/null

echo "🔨 部署 Cloud Function（Gen2）..."
cd "$(dirname "$0")"

gcloud functions deploy "${FUNCTION_NAME}" \
  --gen2 \
  --runtime nodejs20 \
  --region "${REGION}" \
  --entry-point logisticsApi \
  --trigger-http \
  --allow-unauthenticated \
  --project "${PROJECT_ID}" \
  --timeout 540s \
  --memory 256Mi \
  --source .

FUNCTION_URL=$(gcloud functions describe "${FUNCTION_NAME}" \
  --gen2 \
  --region "${REGION}" \
  --format 'value(serviceConfig.uri)' \
  --project "${PROJECT_ID}")

echo ""
echo "✅ Logistics API 部署完成"
echo "📡 函数 URL: ${FUNCTION_URL}"
echo ""

