import { test, expect } from '@playwright/test';

/**
 * 导航栏测试 - 测试客户自助下单链接
 * 创建时间: 2024-12-19 15:30:00
 */
test.describe('导航栏 - 客户自助下单链接', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('桌面端：应该显示客户自助下单链接', async ({ page }) => {
    // 检查中文环境下的链接文本
    const customerPortalLink = page.getByRole('link', { name: '客户自助下单' });
    await expect(customerPortalLink).toBeVisible();
    
    // 检查链接的 href 属性
    await expect(customerPortalLink).toHaveAttribute(
      'href',
      'https://tms-frontend-v4estohola-df.a.run.app/customer/portal'
    );
    
    // 检查链接在新标签页打开
    await expect(customerPortalLink).toHaveAttribute('target', '_blank');
    await expect(customerPortalLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('桌面端：英文环境下应该显示 Customer Portal 链接', async ({ page }) => {
    // 切换到英文
    const languageButton = page.getByRole('button', { name: /CN|EN/ });
    await languageButton.click();
    
    // 等待语言切换
    await page.waitForTimeout(500);
    
    // 检查英文环境下的链接文本
    const customerPortalLink = page.getByRole('link', { name: 'Customer Portal' });
    await expect(customerPortalLink).toBeVisible();
    
    // 检查链接的 href 属性
    await expect(customerPortalLink).toHaveAttribute(
      'href',
      'https://tms-frontend-v4estohola-df.a.run.app/customer/portal'
    );
  });

  test('移动端：应该显示客户自助下单链接', async ({ page }) => {
    // 设置移动端视口
    await page.setViewportSize({ width: 375, height: 667 });
    
    // 等待页面加载
    await page.waitForLoadState('networkidle');
    
    // 查找移动端菜单按钮（包含 Menu 或 X 图标的按钮）
    const nav = page.getByRole('navigation');
    const menuButton = nav.locator('button').filter({ has: page.locator('svg') }).last();
    
    // 检查菜单按钮是否可见
    await expect(menuButton).toBeVisible();
    
    // 打开移动端菜单
    await menuButton.click();
    
    // 等待菜单打开（等待下拉菜单出现）
    await page.waitForSelector('.md\\:hidden.bg-white', { state: 'visible' });
    
    // 检查移动端菜单中的链接
    const customerPortalLink = nav.getByRole('link', { name: '客户自助下单' });
    await expect(customerPortalLink).toBeVisible();
    
    // 检查链接属性
    await expect(customerPortalLink).toHaveAttribute(
      'href',
      'https://tms-frontend-v4estohola-df.a.run.app/customer/portal'
    );
  });

  test('客户自助下单链接应该在运单追踪之后', async ({ page }) => {
    // 在导航栏中查找运单追踪和客户自助下单
    const nav = page.getByRole('navigation');
    const trackingButton = nav.getByRole('button', { name: '运单追踪' });
    const customerPortalLink = nav.getByRole('link', { name: '客户自助下单' });
    
    await expect(trackingButton).toBeVisible();
    await expect(customerPortalLink).toBeVisible();
    
    // 检查它们在 DOM 中的顺序（客户自助下单应该在运单追踪之后）
    const trackingIndex = await trackingButton.evaluate((el) => {
      const parent = el.closest('.hidden.md\\:flex') || el.parentElement;
      return Array.from(parent?.children || []).indexOf(el);
    });
    
    const portalIndex = await customerPortalLink.evaluate((el) => {
      const parent = el.closest('.hidden.md\\:flex') || el.parentElement;
      return Array.from(parent?.children || []).indexOf(el);
    });
    
    // 客户自助下单应该在运单追踪之后（索引更大）
    expect(portalIndex).toBeGreaterThan(trackingIndex);
  });

  test('点击客户自助下单链接应该在新标签页打开', async ({ page, context }) => {
    // 监听新标签页
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: '客户自助下单' }).click(),
    ]);
    
    // 等待新页面加载
    await newPage.waitForLoadState();
    
    // 检查新页面的 URL
    expect(newPage.url()).toContain('tms-frontend-v4estohola-df.a.run.app/customer/portal');
    
    // 关闭新标签页
    await newPage.close();
  });
});

