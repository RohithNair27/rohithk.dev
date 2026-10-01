import { test, expect } from '@playwright/test';

test.describe('Landing (Kaiju) page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('shows the intro copy and LinkedIn button', async ({ page }) => {
    await expect(page.getByText('hello my name is')).toBeVisible();
    await expect(page.locator('.preTitle[aria-label="Rohith"]')).toBeVisible();
    await expect(page.locator('.resumeBtn')).toHaveText('LinkedIn');
    await expect(page.locator('.resumeBtn')).toBeVisible();
  });

  test('shows the tagline and social links', async ({ page }) => {
    await expect(page.getByText('Frontend and QA Engineer')).toBeVisible();
    await expect(page.getByRole('link', { name: 'LinkedIn' }).last()).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/rohithknair27/',
    );
    await expect(page.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
      'href',
      'https://github.com/',
    );
  });

  test('About Me label navigates to the About page', async ({ page }) => {
    await page.getByRole('button', { name: 'About Me' }).dispatchEvent('click');
    await expect(page).toHaveURL('/about');
  });

  test('Experience label navigates to the Experience page', async ({ page }) => {
    await page.getByRole('button', { name: 'Experience' }).dispatchEvent('click');
    await expect(page).toHaveURL('/experience');
  });

  test('Projects label navigates to the Projects page', async ({ page }) => {
    await page.getByRole('button', { name: 'Projects' }).dispatchEvent('click');
    await expect(page).toHaveURL('/projects');
  });

  test('QA Lab label navigates to the QA Lab page', async ({ page }) => {
    await page.getByRole('button', { name: 'QA Lab' }).dispatchEvent('click');
    await expect(page).toHaveURL('/qa-lab');
  });

  test('scrolling walks the figure along the path', async ({ page }) => {
    const kaiju = page.locator('.kaiju');
    const before = await kaiju.evaluate((el) => getComputedStyle(el).transform);

    await page.evaluate(() => window.scrollTo(3000, 0));
    await expect
      .poll(async () => kaiju.evaluate((el) => getComputedStyle(el).transform))
      .not.toBe(before);
  });
});
