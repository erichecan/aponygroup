import { test, expect } from '@playwright/test';

/**
 * 运单跟踪页面测试 - 测试客户自助下单服务
 * 更新时间: 2024-12-19 16:00:00
 */
test.describe('运单跟踪页面 - 客户自助下单服务', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // 导航到运单跟踪页面 - 使用导航栏中的按钮
    const nav = page.getByRole('navigation');
    await nav.getByRole('button', { name: '运单追踪' }).click();
    await page.waitForLoadState('networkidle');
  });

  test('应该显示客户自助下单服务区域', async ({ page }) => {
    // 检查客户自助下单标题
    const heading = page.getByRole('heading', { name: '客户自助下单' });
    await expect(heading).toBeVisible();

    // 检查描述文本
    const description = page.getByText('快速下单，实时追踪，一站式物流服务管理平台');
    await expect(description).toBeVisible();

    // 检查立即下单按钮
    const orderButton = page.getByRole('link', { name: '立即下单' });
    await expect(orderButton).toBeVisible();
  });

  test('英文环境下应该显示 Customer Portal', async ({ page }) => {
    // 切换到英文
    const nav = page.getByRole('navigation');
    const languageButton = nav.getByRole('button', { name: /CN|EN/ });
    await languageButton.click();

    // 等待语言切换
    await page.waitForTimeout(500);

    // 导航到运单跟踪页面
    await nav.getByRole('button', { name: 'Track Order' }).click();
    await page.waitForLoadState('networkidle');

    // 检查英文标题
    const heading = page.getByRole('heading', { name: 'Customer Portal' });
    await expect(heading).toBeVisible();

    // 检查英文按钮
    const orderButton = page.getByRole('link', { name: 'Place Order Now' });
    await expect(orderButton).toBeVisible();
  });

  test('客户自助下单链接应该指向正确的 URL', async ({ page }) => {
    const orderButton = page.getByRole('link', { name: '立即下单' });

    // 检查链接的 href 属性
    await expect(orderButton).toHaveAttribute(
      'href',
      'https://tms.aponygroup.com/customer/portal'
    );

    // 检查链接在新标签页打开
    await expect(orderButton).toHaveAttribute('target', '_blank');
    await expect(orderButton).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('点击立即下单按钮应该在新标签页打开', async ({ page, context }) => {
    // 监听新标签页
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('link', { name: '立即下单' }).click(),
    ]);

    // 等待新页面加载
    await newPage.waitForLoadState();

    // 检查新页面的 URL
    expect(newPage.url()).toContain('tms.aponygroup.com/customer/portal');

    // 关闭新标签页
    await newPage.close();
  });

  test('客户自助下单服务区域应该在运单查询表单下方', async ({ page }) => {
    // 检查运单查询表单存在
    const trackingForm = page.locator('form');
    await expect(trackingForm).toBeVisible();

    // 检查客户自助下单区域存在
    const customerPortalSection = page.getByRole('heading', { name: '客户自助下单' });
    await expect(customerPortalSection).toBeVisible();

    // 检查它们在 DOM 中的顺序（客户自助下单应该在表单之后）
    const formIndex = await trackingForm.evaluate((el) => {
      return Array.from(document.body.querySelectorAll('form, h2')).indexOf(el);
    });

    const portalIndex = await customerPortalSection.evaluate((el) => {
      return Array.from(document.body.querySelectorAll('form, h2')).indexOf(el);
    });

    // 客户自助下单应该在表单之后（索引更大）
    expect(portalIndex).toBeGreaterThan(formIndex);
  });
});

