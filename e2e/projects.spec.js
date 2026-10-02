import { test, expect } from '@playwright/test';

test.describe('Projects page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/projects');
  });

  test('shows the page title and every billboard', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Projects', level: 1 })).toBeVisible();

    await expect(page.getByRole('heading', { name: 'Poke-battle' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Compendia' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'WTF (Where is the Food)' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Cypress Testing' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Native Audio' })).toBeVisible();
  });

  test('renders tags and links for each billboard', async ({ page }) => {
    await expect(page.getByText('Flask', { exact: true })).toBeVisible();
    await expect(page.getByText('FastAPI', { exact: true })).toBeVisible();
    await expect(page.getByText('React Native', { exact: true })).toHaveCount(2);
    await expect(page.getByText('React Native', { exact: true }).first()).toBeVisible();
    await expect(page.getByText('Cypress', { exact: true })).toBeVisible();
    await expect(page.getByText('Expo', { exact: true })).toBeVisible();

    await expect(page.getByRole('link', { name: 'Code' })).toHaveCount(0);
    await expect(page.getByRole('link', { name: 'GitHub' }).nth(0)).toHaveAttribute(
      'href',
      'https://github.com/PokeBattle-An-ASL-Game/Poke-battle',
    );
    await expect(page.getByRole('link', { name: 'GitHub' }).nth(1)).toHaveAttribute(
      'href',
      'https://github.com/RohithNair27/compendia',
    );
    await expect(page.getByRole('link', { name: 'Link', exact: true }).nth(0)).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=NJechzEHjQ4',
    );
    await expect(page.getByRole('link', { name: 'Link', exact: true }).nth(1)).toHaveAttribute(
      'href',
      'https://www.youtube.com/watch?v=3TTQhyxBCLw',
    );
    await expect(page.getByRole('link', { name: 'GitHub' }).nth(2)).toHaveAttribute(
      'href',
      'https://github.com/RohithNair27/WTF-Where-is-the-food-',
    );
    await expect(page.getByRole('link', { name: 'GitHub' }).nth(3)).toHaveAttribute(
      'href',
      'https://github.com/RohithNair27/Cypress-Testing',
    );
    await expect(page.getByRole('link', { name: 'GitHub' }).nth(4)).toHaveAttribute(
      'href',
      'https://github.com/RohithNair27/Native-audio',
    );
    await expect(page.getByRole('link', { name: 'Demo' })).toHaveCount(1);
    await expect(page.getByRole('link', { name: 'App', exact: true })).toHaveCount(1);
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
