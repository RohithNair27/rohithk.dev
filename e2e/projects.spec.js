import { test, expect } from '@playwright/test';

test.describe('Projects page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('shows the page title and every billboard', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Designing software' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'API performance' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Project three' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Mobile app' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Test suite' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Python tooling' })).toBeVisible();
  });

  test('renders tags and links for each billboard', async ({ page }) => {
    await expect(page.getByText('Figma', { exact: true })).toBeVisible();
    await expect(page.getByText('Redis', { exact: true })).toBeVisible();
    await expect(page.getByText('React Native', { exact: true })).toBeVisible();
    await expect(page.getByText('Playwright', { exact: true })).toBeVisible();
    await expect(page.getByText('Pandas', { exact: true })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Code' })).toHaveCount(5);
    await expect(page.getByRole('link', { name: 'Case study' })).toHaveCount(1);
    await expect(page.getByRole('link', { name: 'App Store' })).toHaveCount(1);
  });

  test('has a Home button and a back-to-walk link that both go to "/"', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    await expect(page.getByRole('link', { name: /back to the walk/i })).toHaveAttribute(
      'href',
      '/',
    );
  });

  test('clicking Home navigates back to the landing route', async ({ page }) => {
    await page.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL('/');
  });
});
