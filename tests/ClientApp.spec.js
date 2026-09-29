const { test, expect } = require('@playwright/test');

test('Identifying items on Dashboard Page', async ({ page }) => {   

    await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    // const email = process.env.USERNAME;
    // const pwd = process.env.PASSWORD;

    // await page.locator('[formcontrolname="userEmail"]').fill(email);
    // await page.locator('[formcontrolname="userPassword"]').fill(pwd);
    await page.locator('[formcontrolname="userEmail"]').fill("kameswaridd@gmail.com");
    await page.locator('[formcontrolname="userPassword"]').fill("Playwright123");
    await page.locator('[name="login"]').click();
  //await page.waitForLoadState('networkidle');
    await page.locator('.card-body b').first().waitFor();
    console.log(await page.locator('.card-body b').first().textContent());
    console.log(await page.locator('.card-body b').nth(1).textContent());
    console.log(await page.locator('.card-body b').last().textContent());
    console.log(await page.locator('.card-body b').allTextContents());

});

