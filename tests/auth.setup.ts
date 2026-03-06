import {test as setup,expect} from "@playwright/test";
import { LoginPage } from "./pageObjects/LoginPage";

const authFile = "playwright/.auth/user.json";


setup("authenticate",async({page})=>{
    let loginPage:LoginPage;
    await page.goto(process.env.URL);
    loginPage = new LoginPage(page);
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce');
    await loginPage.validateLogin();
    await page.context().storageState({path:authFile}); 
    
})