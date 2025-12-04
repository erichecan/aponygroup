#!/bin/bash
# 部署新闻抓取 Cloud Function 脚本
# 时间戳：2025-01-27

set -e

PROJECT_ID="882380127696"
FUNCTION_NAME="fetch-news"
REGION="asia-east1"

echo "🚀 开始部署新闻抓取 Cloud Function..."

# 设置项目
gcloud config set project ${PROJECT_ID}

# 启用必要的 API
echo "📋 检查必要的 API..."
gcloud services enable cloudfunctions.googleapis.com --project=${PROJECT_ID}
gcloud services enable cloudbuild.googleapis.com --project=${PROJECT_ID}
gcloud services enable run.googleapis.com --project=${PROJECT_ID}
gcloud services enable cloudscheduler.googleapis.com --project=${PROJECT_ID}

# 部署 Cloud Function
echo "🔨 部署 Cloud Function..."
cd "$(dirname "$0")"

gcloud functions deploy ${FUNCTION_NAME} \
  --gen2 \
  --runtime nodejs20 \
  --region ${REGION} \
  --entry-point fetchNews \
  --trigger-http \
  --allow-unauthenticated \
  --project ${PROJECT_ID} \
  --timeout 540s \
  --memory 256Mi \
  --source .

# 获取函数 URL
FUNCTION_URL=$(gcloud functions describe ${FUNCTION_NAME} \
  --gen2 \
  --region ${REGION} \
  --format 'value(serviceConfig.uri)' \
  --project ${PROJECT_ID})

echo "✅ Cloud Function 部署完成"
echo "📡 函数 URL: ${FUNCTION_URL}"

# 创建 Cloud Scheduler 任务（如果不存在）
echo "⏰ 配置 Cloud Scheduler..."
JOB_NAME="fetch-news-daily"

if gcloud scheduler jobs describe ${JOB_NAME} --location=${REGION} --project=${PROJECT_ID} &>/dev/null; then
  echo "⚠️  调度任务已存在，跳过创建"
  echo "如需更新，请手动运行："
  echo "gcloud scheduler jobs update http ${JOB_NAME} --location=${REGION} --schedule=\"0 2 * * *\" --uri=\"${FUNCTION_URL}\""
else
  echo "📅 创建每日调度任务..."
  gcloud scheduler jobs create http ${JOB_NAME} \
    --schedule="0 2 * * *" \
    --uri="${FUNCTION_URL}" \
    --http-method=GET \
    --location=${REGION} \
    --project=${PROJECT_ID} \
    --description="每天自动抓取新闻（UTC 02:00）" \
    --time-zone="UTC"
  
  echo "✅ 调度任务创建完成"
fi

echo ""
echo "✅ 部署完成！"
echo ""
echo "📝 下一步："
echo "   1. 测试函数: curl ${FUNCTION_URL}"
echo "   2. 查看日志: gcloud functions logs read ${FUNCTION_NAME} --gen2 --region ${REGION} --limit 50"
echo "   3. 查看调度: gcloud scheduler jobs describe ${JOB_NAME} --location=${REGION}"
echo ""

