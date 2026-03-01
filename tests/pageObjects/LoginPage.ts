import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {

    private readonly usernameTextbox: Locator;
    private readonly passwordTextbox: Locator;
    private readonly loginButton: Locator;
    private readonly shoppingCartIcon:Locator;
    private readonly errorMessage:Locator;

    constructor(page:Page){
        this.usernameTextbox = page.getByRole('textbox',{name:'Username'})
        this.passwordTextbox = page.getByRole('textbox',{name:'Password'})
        this.loginButton = page.getByRole('button',{name:'Login'})
        this.shoppingCartIcon = page.locator('a.shopping_cart_link')
        this.errorMessage = page.locator('//h3[@data-test=\'error\']')      
    }


    async fillUsername(username:string){
        await this.usernameTextbox.fill(username);
    }

    async fillPassword(password:string){
        await this.passwordTextbox.fill(password);
    }

    async clickLogin(){
        await this.loginButton.click();
    }


    async loginWithCredentials(username:string,password:string){
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLogin();
    }

    async validateLogin(){
        await expect(this.shoppingCartIcon).toBeVisible();
    }

    async validateErrorMessage(errorMessageText:string){
        await expect(this.errorMessage).toBeVisible();

        await expect(this.errorMessage).toHaveText(errorMessageText);
    }








}