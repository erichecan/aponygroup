# API 集成设置指南

**创建日期**: 2025-01-27  
**状态**: 📋 **配置文档**

---

## 📋 概述

本文档说明如何设置表单提交和追踪功能的 API 端点。

---

## 🔧 表单 API 集成

### 选项 1: 使用 Google Cloud Functions（推荐）

#### 1. 创建 Cloud Function

创建新文件: `functions/contact-form/index.js`

```javascript
const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');

functions.http('submitContact', async (req, res) => {
  // CORS 支持
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const { name, email, subject, message } = req.body;

    // 验证必填字段
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // TODO: 发送邮件（使用 SendGrid、Nodemailer 等）
    // TODO: 保存到数据库（可选）

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully'
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
});
```

#### 2. 配置环境变量

创建 `functions/contact-form/.env.yaml`:

```yaml
SENDGRID_API_KEY: "your-sendgrid-api-key"
ADMIN_EMAIL: "admin@aponygroup.com"
```

#### 3. 部署

```bash
cd functions/contact-form
gcloud functions deploy submit-contact \
  --gen2 \
  --runtime nodejs20 \
  --trigger-http \
  --allow-unauthenticated \
  --region asia-east1
```

### 选项 2: 使用第三方服务

#### SendGrid 示例

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: 'admin@aponygroup.com',
  from: 'noreply@aponygroup.com',
  subject: `Contact Form: ${subject}`,
  text: `From: ${name} (${email})\n\n${message}`,
  html: `<p><strong>From:</strong> ${name} (${email})</p><p>${message}</p>`
};

await sgMail.send(msg);
```

---

## 🚚 追踪 API 集成

### 选项 1: 连接真实物流 API

创建 Cloud Function: `functions/tracking/index.js`

```javascript
const functions = require('@google-cloud/functions-framework');

functions.http('trackOrder', async (req, res) => {
  const trackingId = req.query.trackingId || req.params.trackingId;

  try {
    // TODO: 调用物流供应商 API
    // 示例：UPS, FedEx, USPS API
    
    const trackingData = await fetchTrackingFromProvider(trackingId);

    res.status(200).json({
      success: true,
      data: trackingData
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});
```

### 选项 2: 内部数据库查询

如果使用内部系统：

```javascript
const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore();

const orderRef = db.collection('orders').doc(trackingId);
const orderDoc = await orderRef.get();

if (!orderDoc.exists) {
  return res.status(404).json({
    success: false,
    error: 'Order not found'
  });
}

return res.status(200).json({
  success: true,
  data: orderDoc.data()
});
```

---

## 🔐 安全性配置

### 添加 reCAPTCHA

1. 在前端集成 reCAPTCHA:

```typescript
import { submitContactForm } from '../utils/api';

const handleSubmit = async (formData) => {
  // 获取 reCAPTCHA token
  const token = await window.grecaptcha.execute('SITE_KEY', { action: 'submit' });
  
  await submitContactForm({
    ...formData,
    recaptchaToken: token
  });
};
```

2. 在服务器端验证:

```javascript
const recaptcha = require('node-fetch');

const verifyRecaptcha = async (token) => {
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
  });
  
  const data = await response.json();
  return data.success && data.score > 0.5;
};
```

---

## 📝 环境变量配置

创建 `.env` 文件:

```env
VITE_API_ENDPOINT=https://your-api-endpoint.com/api/contact
VITE_TRACKING_API_ENDPOINT=https://your-api-endpoint.com/api/tracking
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

---

## 🚀 部署步骤

1. **开发环境测试**
   ```bash
   npm run dev
   # 测试表单提交功能
   ```

2. **部署 API 端点**
   ```bash
   # 部署 Cloud Functions
   cd functions/contact-form
   ./deploy.sh
   ```

3. **配置前端环境变量**
   - 在生产环境设置 `VITE_API_ENDPOINT`
   - 或在代码中直接配置

4. **测试集成**
   - 提交测试表单
   - 验证邮件接收
   - 测试错误处理

---

## 📊 API 响应格式

### 成功响应

```json
{
  "success": true,
  "message": "Message sent successfully",
  "data": {
    "id": "contact-123456",
    "timestamp": "2025-01-27T10:00:00Z"
  }
}
```

### 错误响应

```json
{
  "success": false,
  "error": "Error message here"
}
```

---

## 🔍 调试

### 检查网络请求

在浏览器开发者工具的 Network 标签中查看:
- 请求 URL
- 请求方法
- 请求体
- 响应状态码
- 响应内容

### 日志

- Cloud Functions 日志: `gcloud functions logs read submit-contact --gen2 --limit 50`
- 浏览器控制台: 查看前端错误

---

**最后更新**: 2025-01-27

