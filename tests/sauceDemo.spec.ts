import test, { expect } from "@playwright/test";
import { LoginPage } from "./pageObjects/LoginPage";



test('Add product in the cart', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    /*await page.getByRole('textbox',{name:'Username'}).fill('standard_user');

    await page.getByRole('textbox',{name:'Password'}).fill('secret_sauce');

    await page.getByRole('button',{name:'Login'}).click();*/

    //await page.screenshot({path:'screenshot/screen_with_full_page.png',fullPage:true});

    const loginPage = new LoginPage(page);


    await loginPage.loginWithCredentials('standard_user','secret_sauce');

    await loginPage.validateLogin();
    //await page.screenshot({path:'screenshot/screen_with_full1_page.png',fullPage:true});



    await expect(page.locator('//div[@class=\'app_logo\']')).toBeVisible();

    const itemsContainer = await page.locator('#inventory_container .inventory_item').all();

    const randomIndex = Math.floor(Math.random()*itemsContainer.length);

    const randomItem = itemsContainer[randomIndex];

    const expectedDescription = await randomItem.locator('.inventory_item_desc').innerText();

    const expectedPrice = await randomItem.locator('.inventory_item_price').innerText();

    const expectedName = await randomItem.locator('.inventory_item_name ').innerText();

    await randomItem.getByRole('button',{name:'Add to cart'}).click();

    await page.locator('a.shopping_cart_link').click();

    await expect(page.getByRole('button',{name:'Checkout'})).toBeVisible();

    const actualName = await page.locator('.inventory_item_name').innerText();
    const actualPrice = await page.locator('.inventory_item_price').innerText();
    const actualDescription = await page.locator('.inventory_item_desc').innerText();


    await expect(actualName).toEqual(expectedName);
    await expect(actualPrice).toEqual(expectedPrice);
    await expect(actualDescription).toEqual(expectedDescription);


    await page.getByRole('button',{name:'Checkout'}).click();


    await page.getByRole('textbox',{name:'First Name'}).fill('Alejandro');

    await page.getByRole('textbox',{name:'Last Name'}).fill('Jimenez');

    await page.getByRole('textbox',{name:'Zip/Postal Code'}).fill('12345');

    await page.getByRole('button',{name:'Continue'}).click();

    await page.getByRole('button',{name:'Finish'}).click();


    await expect(page.getByRole('heading',{name:'Thank you for your order!'})).toContainText('Thank you for your order!');

    await expect(page.getByRole('heading',{name:'Thank you for your order!'})).toBeVisible();
    

    console.log(`Price: ${expectedPrice}, Name: ${expectedName}, Description: ${expectedDescription}`)




});    