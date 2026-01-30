# Dockerfile for AponyGroup Website
# Created: 2025-01-27

# 使用 Node.js 官方镜像作为构建环境
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 复制 package 文件
COPY package*.json ./

# 创建临时 package.json，移除 canvas（测试依赖，构建时不需要）- 2025-01-27
RUN sed -i '/"canvas"/d' package.json || true

# 安装依赖（canvas 已被移除，不会导致构建失败）
RUN npm install

# 复制源代码
COPY . .

# 注入 Vite 构建时环境变量（用于前端调用后端 API）- 2026-01-14 13:44:52
ARG VITE_LOGISTICS_API_URL
ENV VITE_LOGISTICS_API_URL=$VITE_LOGISTICS_API_URL

# 构建应用（API key 将在运行时通过环境变量注入）
# 注意：这里构建时不会包含 API key，需要在运行时通过服务器端注入
RUN npm run build

# 使用 nginx 作为生产服务器
FROM nginx:alpine

ENV PYTHONUNBUFFERED=1

# Install Python3 and pip for Streamlit
RUN apk add --no-cache python3 py3-pip build-base jpeg-dev zlib-dev freetype-dev libxml2-dev libxslt-dev

# 复制构建产物到 nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy tools directory
COPY tools /usr/share/nginx/html/tools

# Install Python requirements
# We need to use --break-system-packages on newer alpine versions or use venv
# For simplicity in this env, we try direct install or --break-system-packages if needed
RUN pip3 install -r /usr/share/nginx/html/tools/pdf-to-excel/requirements.txt --break-system-packages

# Copy start script
COPY start.sh /start.sh
RUN chmod +x /start.sh

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80 8501

# 启动 nginx 和 streamlit
CMD ["/start.sh"]

