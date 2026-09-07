import { test, expect } from '@playwright/test';

test.describe('QA Lab page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/qa-lab');
  });

  test('starts idle with all groups and the API section visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'QA Lab', level: 1 })).toBeVisible();
    await expect(page.getByText('Walk page smoke')).toBeVisible();
    await expect(page.getByText('idle — 31 specs ready to run')).toBeVisible();
    await expect(page.getByText('API TESTING · POSTMAN COLLECTION')).toBeVisible();
  });

  test('expands a group to show its tests', async ({ page }) => {
    await page.getByText('Walk page smoke').click();
    await expect(page.getByText('hello my name is renders')).toBeVisible();
  });

  test('running the suite streams console lines and ends passed', async ({ page }) => {
    await page.getByRole('button', { name: 'RUN QA SUITE' }).click();
    await expect(page.getByText('RUNNING…')).toBeVisible();
    await expect(page.getByText('All 31/31 tests passed successfully.')).toBeVisible({
      timeout: 10_000,
    });
    await expect(page.getByText('31/31').first()).toBeVisible();
  });

  test('running the API tests streams to a 200 OK response', async ({ page }) => {
    await page.getByRole('button', { name: 'RUN API TESTS' }).click();
    await expect(page.getByText('SENDING…')).toBeVisible();
    await expect(page.getByText('200 OK')).toBeVisible({ timeout: 5_000 });
  });

  test('has a Home button and a back-to-walk link that both go to "/"', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    await expect(page.getByRole('link', { name: /back to the walk/i })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
