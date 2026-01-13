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

# 构建应用（API key 将在运行时通过环境变量注入）
# 注意：这里构建时不会包含 API key，需要在运行时通过服务器端注入
RUN npm run build

# 使用 nginx 作为生产服务器
FROM nginx:alpine

# 复制构建产物到 nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# 复制 nginx 配置
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动 nginx
CMD ["nginx", "-g", "daemon off;"]

