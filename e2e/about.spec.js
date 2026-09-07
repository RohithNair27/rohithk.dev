import { test, expect } from '@playwright/test';

test.describe('About Me page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('shows the title, summary, and CATT Lab link', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'About Me', level: 1 })).toBeVisible();
    await expect(page.getByText(/university of maryland college park/i)).toBeVisible();
    await expect(page.getByRole('link', { name: 'CATT labs' })).toHaveAttribute(
      'href',
      'https://www.cattlab.umd.edu/',
    );
  });

  test('lists what is currently being learned', async ({ page }) => {
    await expect(page.getByText('Currently learning:')).toBeVisible();
    await expect(page.getByRole('listitem')).toHaveCount(4);
  });

  test('has a Home button and a back-to-walk link that both go to "/"', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    await expect(page.getByRole('link', { name: /back to the walk/i })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
