const {test, expect} = require('@playwright/test')

test('Practice example1', async({page}) => {

    const userName = page.locator('#userEmail')
    const password = page.locator('#userPassword')
    const logIn = page.locator('[type="submit"]')

    await page.goto("https://rahulshettyacademy.com/client/#/auth/login")
    console.log(await page.title())
    await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/auth/login")

    await userName.fill('kameswaridd@gmail.com')
    await password.fill('Password123')
    await logIn.click()

//await expect(page.locator('div.card-body b').first()).toBeVisible()
//console.log(await page.locator('div.card-body b').first().textContent());

//Another ways of wait mechanisim before loading elements
//await page.waitForLoadState("networkidle")
await page.locator('div.card-body b').first().waitFor()

console.log(await page.locator('div.card-body b').allTextContents())


})