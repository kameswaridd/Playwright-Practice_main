const { test, expect } = require('@playwright/test')
const { APIUtils } = require('../utils/APIUtils');
let webContext;

test.beforeAll(async ({ browser }) => {


    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#userEmail')
    const password = page.locator('#userPassword')
    const logIn = page.locator('[type="submit"]')

    await page.goto('https://rahulshettyacademy.com/client')
    await userName.fill('kameswaridd@gmail.com')
    await password.fill('Password123')
    await logIn.click()
    await page.waitForLoadState("networkidle")
    await context.storageState({ path: 'state.json' })
    webContext = await browser.newContext({ storageState: 'state.json' })
})

test('Selecting the item from the ecommerce app', async () => {

    const desiredProductName = 'ZARA COAT 3'
    const page = await webContext.newPage()
    await page.goto('https://rahulshettyacademy.com/client/')
    const products = page.locator('.card-body')
    await page.locator('h5').first().waitFor()

    console.log(await page.locator('h5').allTextContents())

    //Order Zara coat-3 -Method:1

    const zataCoat3 = await page.locator('h5').nth(1)
    const addToCartButton = page.locator('.card')
        .filter({ hasText: 'ZARA COAT 3' })
        .getByRole('button', { name: 'Add To Cart' });

    await addToCartButton.click();
    await page.locator("[routerlink*='cart']").click()

    //Order Zara coat-3 -Method:2

    // const count = products.count()
    // for(let i=0; i< await count; ++i){

    //     if (await products.nth(i).locator("b").textContent() === desiredProductName){
    //         await products.nth(i).locator("b").getByRole('button', { name: 'Add To Cart' })
    //        // await products.locator("text= Add To Cart").click();
    //         break;
    //    }
    // }


    await expect(page.locator('.cartSection h3')).toHaveText('ZARA COAT 3')
    console.log(await page.locator('.cartSection h3').textContent())

    //await page.locator('li.totalRow')[2].click()
    await page.locator('li.totalRow').getByRole('button', { name: 'Checkout' }).click()


    await page.locator('input.text-validated').nth(0).fill('1234 1234 1234 1234')
    await page.locator('select.ddl').nth(0).selectOption({ label: '06' })
    await expect(page.locator('select.ddl').first()).toHaveValue('06');
    await page.locator('select.ddl').nth(1).selectOption({ label: '20' })
    await expect(page.locator('select.ddl').nth(1)).toHaveValue('20')


    await page.locator('input.input').nth(1).fill('123')
    await page.locator('input.input').nth(2).fill('SriRam')
    await expect(page.locator('input.input').nth(4)).toHaveValue('kameswaridd@gmail.com')
    console.log(await page.locator('input.input').nth(4).inputValue())

    const country = await page.locator("[placeholder='Select Country']")

    await country.pressSequentially('ind', { delay: 150 })

    await page
        .locator('span.ng-star-inserted').nth(1)
        .filter({ hasText: 'India' })
        .click();
    await expect(page.locator("[placeholder='Select Country']")).toHaveValue('India')
    console.log(await page.locator("[placeholder='Select Country']").inputValue())

    await page.locator('.action__submit').click()

    //await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')

    await expect(page.locator('.hero-primary'))
        .toContainText('Thankyou for the order.')

    console.log(await page.locator('.hero-primary').textContent())

    const confirmationNumber = (await page.locator('tr td label').nth(1).textContent())
        .replace(/\|/g, '')
        .trim();
    console.log(confirmationNumber)
    await page.locator("[routerlink*='myorders']").nth(1).click()

    await page.locator('tbody tr').first().waitFor()
    //await page.waitForLoadState("networkidle")
    const totalOrders = page.locator('tbody tr')
    const orderTexts = await totalOrders.allTextContents()
    // console.log(orderTexts)
    const count = await totalOrders.count()
    for (let i = 0; i < count; i++) {
        const order = totalOrders.nth(i)
        const orderNumber = (await order.locator('th').innerText()).trim()

        if (orderNumber === confirmationNumber) {
            await order.getByRole('button', { name: 'View', exact: true }).click()
            break
        }
    }

    // const matchingOrder = totalOrders.filter({ hasText: confirmationNumber })
    // await expect(matchingOrder).toBeVisible();
    // await matchingOrder.getByRole('button', { name: 'View', exact: true }).click();

    await expect(page.locator('.email-title')).toBeVisible()
    console.log(await page.locator('.email-title').textContent())
})

test('@API Second test', async () => {

    const page = await webContext.newPage()
    await page.goto('https://rahulshettyacademy.com/client/');
    console.log(await page.title());
    await expect(page).toHaveTitle("Let's Shop");
    const products = page.locator('.card-body')
    await page.locator('h5').first().waitFor()

    console.log(await page.locator('h5').allTextContents())

})