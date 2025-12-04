import { test, expect } from '@playwright/test';

/**
 * Footer Logo 测试 - 验证 Footer 中使用带白色背景的 Logo
 * 更新时间: 2025-01-27
 */
test.describe('Footer Logo 显示测试', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('Footer 中应该使用带白色背景的 logo', async ({ page }) => {
    // 滚动到页面底部
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    // 等待 Footer 加载
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // 检查 Footer 中 logo 图片的 src 属性应该包含 logo-white-bg.png
    const logoInFooter = footer.locator('img[alt="AponyGroup Logo"]');
    await expect(logoInFooter).toBeVisible();
    
    // 验证 logo 使用的是白色背景版本
    const logoSrc = await logoInFooter.getAttribute('src');
    expect(logoSrc).toContain('logo-white-bg.png');
  });

  test('Footer 中的 logo 应该在黑色背景上可见', async ({ page }) => {
    // 滚动到页面底部
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    // 等待 Footer 加载
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // 检查 Footer 背景是黑色
    const footerBackground = await footer.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Footer 应该有黑色背景
    expect(footerBackground).toContain('rgb(0, 0, 0)');
    
    // 检查 logo 是否可见（图片应该加载成功）
    const logoInFooter = footer.locator('img[alt="AponyGroup Logo"]');
    await expect(logoInFooter).toBeVisible();
    
    // 验证图片已加载（naturalWidth > 0 表示图片成功加载）
    const isImageLoaded = await logoInFooter.evaluate((img: HTMLImageElement) => {
      return img.complete && img.naturalWidth > 0;
    });
    
    expect(isImageLoaded).toBe(true);
  });

  test('Navbar 中应该使用透明背景的 logo', async ({ page }) => {
    // 检查导航栏中的 logo
    const navbar = page.getByRole('navigation');
    await expect(navbar).toBeVisible();
    
    // Navbar 中的 logo 应该使用默认版本（透明背景）
    const logoInNavbar = navbar.locator('img[alt="AponyGroup Logo"]');
    await expect(logoInNavbar).toBeVisible();
    
    // 验证 Navbar 中的 logo 使用的是默认透明版本
    const logoSrc = await logoInNavbar.getAttribute('src');
    expect(logoSrc).toContain('logo.png');
    expect(logoSrc).not.toContain('logo-white-bg.png');
  });

  test('Footer 中的 logo 应该有合适的尺寸', async ({ page }) => {
    // 滚动到页面底部
    await page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
    
    // 等待 Footer 加载
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    
    // 检查 Footer 中的 logo
    const logoInFooter = footer.locator('img[alt="AponyGroup Logo"]');
    await expect(logoInFooter).toBeVisible();
    
    // 验证 logo 尺寸（应该比之前的 sm 尺寸大得多）
    const logoSize = await logoInFooter.boundingBox();
    expect(logoSize).not.toBeNull();
    
    // Footer logo 的宽度应该至少是 160px（比之前的 32px 大很多）
    expect(logoSize!.width).toBeGreaterThanOrEqual(160);
    
    // 验证 logo 有适当的高度（保持宽高比）
    expect(logoSize!.height).toBeGreaterThan(40);
  });
});

