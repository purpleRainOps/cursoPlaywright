import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});


test('Enter to link Docs', async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await page.getByRole('link', { name: 'API' }).click();

  await expect(page.getByRole('heading', { name: 'Playwright Library' })).toBeVisible();
});


/*test('Search product in mercado libre', async ({ page }) => {
  await page.goto("https://www.mercadolibre.com.co/");
  await page.locator('input[id=\'cb1-edit\']').fill('iphone');
  await page.keyboard.press('Enter');

  await expect(page.locator('//ol[contains(@class,\'ui-search-layout\')]')).toBeVisible();

  const title = await page.locator('//ol[contains(@class,\'ui-search-layout\')]//li//h3').allInnerTexts();

  for (let item of title) {
    console.log('The title of product is :', item);
  }

  console.log('La cantidad de productos es', title.length);

  await expect(page.locator('//ol[contains(@class,\'ui-search-layout\')]//li//h3')).toHaveCount(title.length);
  ;
})
*/


test('test locators 2', async ({ page }) => {
  await page.goto("https://www.mercadolibre.com.co/");

  await page.getByRole('link', { name: 'Ingresa',exact:true}).click()
})