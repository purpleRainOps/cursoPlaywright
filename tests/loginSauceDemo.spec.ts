import test from "@playwright/test";
import { LoginPage } from "./pageObjects/LoginPage";
import { GoToUrl } from "./utils/GoToUrl";


const url = 'https://www.saucedemo.com/';

const url2 = process.env.URL;
const goToUrl = new GoToUrl(url);

test('Login Successfully', async ({ page }, testInfo) => {
    
    await page.goto(process.env.URL);
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');

    await loginPage.validateLogin();

    await testInfo.attach('login',{
        body: await page.screenshot(),
        contentType: 'image/png'

    })
});

test('Login with invalid user', async ({page})=>{
    await goToUrl.goToUrl(page);
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('invalid_user', 'secret_sauce');
    await loginPage.validateErrorMessage('Epic sadface: Username and password do not match any user in this service');
}),

test('Login with invalid password', async ({page})=>{
    await goToUrl.goToUrl(page);
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('standard_user', 'invalid_password');
    await loginPage.validateErrorMessage('Epic sadface: Username and password do not match any user in this service');
}),

test('Login with invalid username and password', async ({page})=>{
    await goToUrl.goToUrl(page);
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('invalid_user', 'invalid_password');
    await loginPage.validateErrorMessage('Epic sadface: Username and password do not match any user in this service');
}),

test('Login with empty username', async ({page})=>{
    await goToUrl.goToUrl(page);
    const loginPage = new LoginPage(page);

    await loginPage.loginWithCredentials('', 'secret_sauce');
    await loginPage.validateErrorMessage('Epic sadface: Username is required');
}),

test('Login with empty password', async ({page})=>{
    await goToUrl.goToUrl(page);
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('standard_user', '');
    await loginPage.validateErrorMessage('Epic sadface: Password is required');
});


test('Login with locked user', async ({page})=>{
    await goToUrl.goToUrl(page);
    const loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('locked_out_user', 'secret_sauce');
    await loginPage.validateErrorMessage('Epic sadface: Sorry, this user has been locked out.');
})