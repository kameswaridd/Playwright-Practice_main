const {test, expect} = require('@playwright/test');

test('First Playwright test', async ({browser}) => {        

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com');
    console.log(await page.title());
    await expect(page).toHaveTitle(/Google/);
});

test('Page initiation', async ({page}) => {        

    await page.goto('https://www.Rahulshettyacademy.com');
    console.log(await page.title());
    await expect(page).toHaveTitle("Rahul Shetty Academy | QA Automation, Playwright, AI Testing & Online Training");
    
});
