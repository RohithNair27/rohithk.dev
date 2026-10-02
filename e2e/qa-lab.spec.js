import { test, expect } from '@playwright/test';

const API = 'https://jsonplaceholder.typicode.com';

/** Stands in for JSONPlaceholder so the suite doesn't depend on a
 *  third-party service being up; the page's assertions still run for real
 *  against these responses. */
async function mockJsonPlaceholder(page) {
  const post = (id, userId = 1) => ({ id, userId, title: `post ${id}`, body: 'body' });
  await page.route(`${API}/**`, async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    if (req.method() === 'POST') {
      return route.fulfill({ status: 201, json: { ...req.postDataJSON(), id: 101 } });
    }
    const one = url.pathname.match(/^\/posts\/(\d+)$/);
    if (one) {
      const id = Number(one[1]);
      return id <= 100 ? route.fulfill({ json: post(id) }) : route.fulfill({ status: 404, json: {} });
    }
    if (url.searchParams.get('userId')) {
      return route.fulfill({ json: [1, 2, 3].map((id) => post(id, 1)) });
    }
    const limit = Number(url.searchParams.get('_limit') || 100);
    return route.fulfill({ json: Array.from({ length: limit }, (_, i) => post(i + 1, (i % 3) + 1)) });
  });
}

test.describe('QA Lab page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/qa-lab');
  });

  test('starts idle with all groups and the API section visible', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'QA Lab', level: 1 })).toBeVisible();
    await expect(page.getByText('Walk page smoke')).toBeVisible();
    await expect(page.getByText('idle — 31 specs ready to run')).toBeVisible();
    await expect(page.getByText('API TESTING · LIVE REQUESTS')).toBeVisible();
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

  test('running the API tests passes every assertion against the API', async ({ page }) => {
    await mockJsonPlaceholder(page);
    await page.getByRole('button', { name: 'RUN API TESTS' }).click();
    await expect(page.getByText('10 of 10 assertions passing')).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('200 OK', { exact: true })).toBeVisible();
    await expect(page.locator('.qa-api__response-body')).toContainText('"userId": 1');
  });

  test('a broken endpoint shows up as failing assertions', async ({ page }) => {
    await page.route(`${API}/**`, (route) => route.fulfill({ status: 500, json: {} }));
    await page.getByRole('button', { name: 'RUN API TESTS' }).click();
    await expect(page.getByText(/^\d of 10 assertions passing$/)).toBeVisible({ timeout: 10_000 });
    await expect(page.getByText('expected 200, got 500').first()).toBeVisible();
    await expect(page.locator('.qa-api-test__state', { hasText: 'FAIL' }).first()).toBeVisible();
  });

  test('has a Home button and a back-to-walk link that both go to "/"', async ({ page }) => {
    await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    await expect(page.getByRole('link', { name: /back to the walk/i })).toHaveAttribute(
      'href',
      '/',
    );
  });
});
