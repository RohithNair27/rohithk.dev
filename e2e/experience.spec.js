import { test, expect } from '@playwright/test';

test.describe('Experience page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/experience');
  });

  test('renders the timeline title and every entry', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Experience', level: 1 })).toBeVisible();
    await expect(page.getByText('Now · CATT Lab')).toBeVisible();
    await expect(page.getByText('University of Maryland College Park')).toBeVisible();
    await expect(page.getByText('Capgemini')).toHaveCount(2);
    await expect(page.getByText('JNTUH Hyderabad')).toBeVisible();
  });

  test('lists all nine UMD courses', async ({ page }) => {
    await expect(page.getByText('ENPM613 — Software Design and Architecture')).toBeVisible();
    await expect(page.locator('.timeline__courses li')).toHaveCount(9);
  });

  test('has a Home button and a back-to-walk link that both go to "/"', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    await expect(page.getByRole('link', { name: /back to the walk/i })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
