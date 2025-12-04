// 生成带白色背景的 Logo 图片 - 2025-01-27
// 使用 canvas 将透明 logo 转换为带白色背景的版本，适用于黑色背景的 Footer
// 时间戳：2025-01-27

const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');
const path = require('path');

async function generateLogoWithWhiteBackground() {
  try {
    // 加载原始透明 logo
    const logoPath = path.join(__dirname, '../public/assets/logo.png');
    
    if (!fs.existsSync(logoPath)) {
      throw new Error(`Logo 文件不存在: ${logoPath}`);
    }

    console.log('正在加载原始 logo...');
    const logo = await loadImage(logoPath);
    
    // 获取原始 logo 尺寸
    const originalWidth = logo.width;
    const originalHeight = logo.height;
    
    console.log(`原始 logo 尺寸: ${originalWidth}x${originalHeight}px`);
    
    // 创建画布，尺寸与原始 logo 相同
    const canvas = createCanvas(originalWidth, originalHeight);
    const ctx = canvas.getContext('2d');
    
    // 填充白色背景
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, originalWidth, originalHeight);
    
    // 绘制原始 logo（在白色背景上）
    ctx.drawImage(logo, 0, 0, originalWidth, originalHeight);
    
    // 保存新图片
    const outputDir = path.join(__dirname, '../public/assets');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, 'logo-white-bg.png');
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    
    console.log(`✅ Logo 已生成: ${outputPath}`);
    console.log(`图片尺寸: ${originalWidth}x${originalHeight}px`);
    console.log(`背景颜色: 白色 (#FFFFFF)`);
    
    return outputPath;
  } catch (error) {
    console.error('❌ 生成 Logo 失败:', error.message);
    throw error;
  }
}

// 执行生成
generateLogoWithWhiteBackground().catch(console.error);

