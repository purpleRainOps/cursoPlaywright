import test, { expect } from "@playwright/test";


let url = 'https://www.demoblaze.com/';
test('Select product of categorie laptop', async ({ page }) => {
    await page.goto(url);

    //Search product of categorie laptop with xpath

    await page.locator('xpath=//a[@onclick="byCat(\'notebook\')"]').click();

    await page.locator('xpath=//a[text()="Sony vaio i5"]').click();

    const dialogPromise = new Promise<void>(resolve => {
        page.once('dialog', async dialog => {
            console.log(`Dialog message: ${dialog.message()}`);

            // 🔴 Esto SÍ fallará si el texto no coincide
            expect(dialog.message()).toBe('Product added');

            await dialog.accept();
            resolve();
        });
    });
    await page.locator('a[class=\'btn btn-success btn-lg\']').click();

    await dialogPromise;






});