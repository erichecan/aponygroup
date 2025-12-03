// 生成 4PL 愿景图片 - 2024-12-19 16:20:00
// 使用 canvas-design 设计哲学创建体现 AponyGroup 4PL 愿景的图片

const { createCanvas, loadImage, registerFont } = require('canvas');
const fs = require('fs');
const path = require('path');

async function generate4PLImage() {
  // 创建画布：1200x900 (4:3 比例)
  const width = 1200;
  const height = 900;
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // 背景：深色 (slate-900)
  ctx.fillStyle = '#0F172A';
  ctx.fillRect(0, 0, width, height);

  // 加载 logo
  const logoPath = path.join(__dirname, '../public/assets/logo.png');
  let logo = null;
  if (fs.existsSync(logoPath)) {
    try {
      logo = await loadImage(logoPath);
      // 在左上角绘制 logo（带透明度）
      const logoSize = 180;
      const logoX = 60;
      const logoY = 60;
      ctx.globalAlpha = 0.9;
      ctx.drawImage(logo, logoX, logoY, logoSize, logoSize * (logo.height / logo.width));
      ctx.globalAlpha = 1.0;
    } catch (err) {
      console.log('Logo 加载失败，继续生成图片:', err.message);
    }
  }

  // 1. 绘制网格背景（代表系统化和精确性）
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 1;
  const gridSpacing = 50;
  for (let x = 0; x <= width; x += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
  }
  for (let y = 0; y <= height; y += gridSpacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // 2. 绘制大型节点（代表主要物流中心）
  const nodeColor = '#FF6B35'; // 品牌橙色
  const nodeRadius = 80;
  const centers = [
    { x: 300, y: 300 },  // 左上
    { x: 900, y: 300 },  // 右上
    { x: 600, y: 600 },  // 中心
    { x: 300, y: 700 },  // 左下
    { x: 900, y: 700 },  // 右下
  ];

  // 绘制连接线（代表物流网络）
  ctx.strokeStyle = nodeColor;
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.6;
  for (let i = 0; i < centers.length; i++) {
    for (let j = i + 1; j < centers.length; j++) {
      ctx.beginPath();
      ctx.moveTo(centers[i].x, centers[i].y);
      ctx.lineTo(centers[j].x, centers[j].y);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1.0;

  // 绘制节点外圈（带透明度效果）
  centers.forEach(center => {
    for (let i = 0; i < 3; i++) {
      ctx.strokeStyle = nodeColor;
      ctx.globalAlpha = 0.2 - i * 0.05;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(center.x, center.y, nodeRadius + i * 20, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1.0;
    
    // 绘制主节点
    ctx.fillStyle = nodeColor;
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(center.x, center.y, nodeRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  });

  // 3. 添加数据流线条（代表信息流和技术）
  ctx.strokeStyle = '#3B82F6'; // 蓝色
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.4;
  for (let i = 0; i < 5; i++) {
    const x1 = 100 + i * 200;
    const y1 = 100;
    const x2 = x1 + 50;
    const y2 = height - 100;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1.0;

  // 4. 在中心区域添加整合符号
  const centerX = width / 2;
  const centerY = height / 2;
  ctx.strokeStyle = nodeColor;
  ctx.lineWidth = 2;
  ctx.globalAlpha = 0.5;
  for (let radius of [150, 170, 190]) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1.0;

  // 5. 添加文字
  ctx.fillStyle = '#FFFFFF';
  ctx.font = 'bold 56px Arial, sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  const text4PL = '4PL';
  const metrics4PL = ctx.measureText(text4PL);
  ctx.fillText(text4PL, width - 60, height - 120);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '24px Arial, sans-serif';
  const textExcellence = 'Excellence';
  ctx.fillText(textExcellence, width - 60, height - 60);

  // 6. 添加装饰性元素 - 在右下角添加小图标
  ctx.fillStyle = nodeColor;
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2;
  const iconX = width - 200;
  const iconY = height - 200;
  // 绘制一个小的整合图标
  ctx.beginPath();
  ctx.arc(iconX, iconY, 30, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // 保存图片
  const outputDir = path.join(__dirname, '../public/assets/hero');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputPath = path.join(outputDir, '4pl-vision.png');
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(outputPath, buffer);
  
  console.log(`✅ 图片已生成: ${outputPath}`);
  console.log(`图片尺寸: ${width}x${height}px`);
  return outputPath;
}

// 执行生成
generate4PLImage().catch(console.error);

