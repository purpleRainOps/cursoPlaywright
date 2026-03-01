import { expect, test } from "@playwright/test";
import { LoginPage } from "./pageObjects/LoginPage";


test('Test with interceptor 1', async ({page})=>{

    page.on("request", req =>{
        console.log(req.url());
    })


    await page.route(
        "**/*.{png,jpg,jpeg,svg}",
        route => route.abort()
    )

    //https://www.saucedemo.com/static/media/bike-light-1200x1500.37c843b09a7d77409d63.jpg
    //https://www.saucedemo.com/static/media/bolt-shirt-1200x1500.c2599ac5f0a35ed5931e.jpg


    await page.goto('https://www.saucedemo.com/');

    const loginPage = new LoginPage(page);
    
    
    await loginPage.loginWithCredentials('standard_user','secret_sauce');
    
    await loginPage.validateLogin();


    await page.screenshot({path:'screenshots/interceptor.png',fullPage:true});

});



test('Intercept api books', async ({page})=>{

    await page.route("https://demoqa.com/BookStore/v1/Books",route=>{
        route.fulfill({
            status:304,
            headers:{
                'Content-Type':'application/json'
            },

            body: `
                  {
    "books": [
        {
            "isbn": "9781449325862",
            "title": "Git Pocket Guide",
            "subTitle": "A Working Introduction",
            "author": "Richard E. Silverman",
            "publish_date": "2020-06-04T08:48:39.000Z",
            "publisher": "O'Reilly Media",
            "pages": 234,
            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
            "website": "http://chimera.labs.oreilly.com/books/1230000000561/index.html"
        }
    ]
}
            `
      
        })


    })

    await page.goto('https://demoqa.com/books');
    
});



test('intercept api books send empty posts', async ({page})=>{

    await page.route("https://demoqa.com/BookStore/v1/Books", route=>{
        route.fulfill({
            status:304,
            headers:{
                'Content-Type':'application/json'
            },
            body: `
            {
            "books":[]
            }
            `
        })
    })

    await page.goto('https://demoqa.com/books');

    //await page.pause();

    await expect(page.locator('div[class=\'rt-noData\']')).toBeVisible();

    await expect(page.locator('div[class=\'rt-noData\']')).toHaveText('No rows found');
})


test('intercept api books with status 500', async ({page})=>{

    await page.route("https://demoqa.com/BookStore/v1/Books",route=>{
        route.fulfill({
            status:500,
            headers:{
                'Content-Type':'application/json'
            },
        })
    })

    await page.goto('https://demoqa.com/books');

    await page.pause();


    await expect(page.locator('label#loading-label')).toBeVisible();
    await expect(page.locator('label#loading-label')).toHaveText('Loading...');
})


test('intercept api books send href incorrect', async ({page})=>{

    await page.route("https://demoqa.com/BookStore/v1/Books", route=>{
        route.fulfill({
            status:304,
            headers:{
                'Content-Type':'application/json'
            },
            body: `
            {
    "books": [
        {
            "isbn": "9781449325862",
            "title": "Git Pocket Guide",
            "subTitle": "A Working Introduction",
            "author": "Richard E. Silverman",
            "publish_date": "2020-06-04T08:48:39.000Z",
            "publisher": "O'Reilly Media",
            "pages": 234,
            "description": "This pocket guide is the perfect on-the-job companion to Git, the distributed version control system. It provides a compact, readable introduction to Git for new users, as well as a reference to common commands and procedures for those of you with Git exp",
            "website": ""
        }
    ]
}
            `
        })
    })

    await page.goto('https://demoqa.com/books');

    await page.pause();

    
});