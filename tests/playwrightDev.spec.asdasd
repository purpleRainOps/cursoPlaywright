import test, { expect } from "@playwright/test";

test('first navegation to playwright.dev',async ({page})=>{
    await page.goto('https://playwright.dev/');

    await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');

    await expect(page).toHaveURL('https://playwright.dev/');

    await expect(page.locator('//h1[@class=\'hero__title heroTitle_ohkl\']')).toBeVisible();

    await expect(page.locator('//h1[@class=\'hero__title heroTitle_ohkl\']')).toHaveText('Playwright enables reliable end-to-end testing for modern web apps.');
});


/*test('Search for a term',async ({page})=>{
    await page.goto('https://playwright.dev/');

    await page.getByLabel('Search (Command+K)').click();

    await expect(page.getByPlaceholder('Search docs')).toBeVisible();

    await page.getByPlaceholder('Search docs').fill('api');

    await page.keyboard.press('Enter');


    await expect(page.locator('//h1[text()=\'Browser\']')).toBeVisible();
});*/