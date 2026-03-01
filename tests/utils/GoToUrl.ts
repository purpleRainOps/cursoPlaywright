import { Page } from "@playwright/test";

export class GoToUrl{

    private readonly url:string;

    constructor(url:string){
        this.url = url;
    }


    async goToUrl(page:Page){
        await page.goto(this.url);
    }
}