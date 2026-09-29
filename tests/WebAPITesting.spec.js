const {test, expect, request} = require('@playwright/test');
const { APIUtils } = require('./utils/APIUtils');

const loginPayLoad = {userEmail: "kameswaridd@gmail.com", userPassword: "Password123"}
const orderPayLoad ={orders: [{country: "Bosnia and Herzegowina", productOrderedId: "6960ea76c941646b7a8b3dd5"}]}
// let token;
// let confirmationNumber;

let response;

test.beforeAll(async() => {

const apiContext =await request.newContext()
const apiUtils = new APIUtils(apiContext,loginPayLoad)
response = await apiUtils.createOrder(orderPayLoad)

})

test('API login setup', async ({ page }) => {

  await page.addInitScript((token) => {
  window.localStorage.setItem('token', token);
}, response.token);

await page.goto('https://rahulshettyacademy.com/client/');

  await page.locator("[routerlink*='myorders']").click()
 await page.locator('tbody tr').first().waitFor()
    //await page.waitForLoadState("networkidle")
    const totalOrders = page.locator('tbody tr')
    const orderTexts = await totalOrders.allTextContents()
   // console.log(orderTexts)
    const count = await totalOrders.count()
    for (let i = 0; i < count; i++) {
        const order = totalOrders.nth(i)
        const orderNumber = (await order.locator('th').innerText()).trim()

        if (orderNumber === response.confirmationNumber) {
            await order.getByRole('button', { name: 'View', exact: true }).click()
            break
        }
    }
    await page.pause()
    await expect(page.locator('.email-title').first()).toBeVisible()
    console.log(await page.locator('.email-title').first().textContent())
 
});