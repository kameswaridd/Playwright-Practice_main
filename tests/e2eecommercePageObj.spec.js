const { test, expect } = require('@playwright/test')
const {customtest} = require('../utils/test-base')
const {POManager} = require('../PageObjects/POManager')
const e2edataset = JSON.parse(JSON.stringify(require('../utils/e2ePOTestData.json')));
// const { LoginPage } = require('../PageObjects/LoginPage')
// const { DashboardPage } = require('../PageObjects/DashboardPage')
// const { CheckoutPage } = require('../PageObjects/CheckoutPage')
// const { PaymentPage } = require('../PageObjects/PaymentPage')
// const { ThankyouOrderPage } = require('../PageObjects/ThankyouPage')
// const { MyOrdersPage } = require('../PageObjects/MyOrdersPage')

//If you want to run the tests in parallel, then you need to use test.describe.configure({ mode: 'parallel' }); and also you need to use test.only for each test case. Otherwise, it will run only the last test case.
//test.describe.configure({ mode: 'parallel' });
for (const data of e2edataset){

test(`@e2eTests Selecting the item from the ecommerce app ${data.desiredProductName}`, async ({ page }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
     const dashboardPage = poManager.getDashboardPage()
    const checkoutPage = poManager.getCheckoutPage()
    const paymentPage = poManager.getPaymentPage()
    const thankyouPage = poManager.getThankyouPage()
    const myordersPage = poManager.getMyOrdersPage()

    // const userName = "kameswaridd@gmail.com";
    // const password = "Password123";
    // const desiredProductName = 'ZARA COAT 3'

    await loginPage.goTo()
    await loginPage.validLogin(data.userName, data.password)

    await expect(dashboardPage.products.first()).toBeVisible()
    await dashboardPage.searchProduct(data.desiredProductName);
    await dashboardPage.clickingOnCart();

    await expect(checkoutPage.myCart).toHaveText(data.desiredProductName)
    console.log(await checkoutPage.myCart.textContent());
    //await page.locator('li.totalRow')[2].click()
    await checkoutPage.clickingOnCheckout();

    await paymentPage.fillingCreditCard();
    await expect(page.locator('input.input').nth(4)).toHaveValue(data.userName)
    console.log(await page.locator('input.input').nth(4).inputValue())

    await paymentPage.selectingCountry();
    await expect(paymentPage.selectCountry).toHaveValue('India')
    console.log(await paymentPage.selectCountry.inputValue())
    await paymentPage.placingOrder();

    //await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')

    await expect(thankyouPage.thankyouOrder).toContainText('Thankyou for the order.')
    console.log(await thankyouPage.thankyouOrder.textContent())

    // const confirmationNumber = (await page.locator('tr td label').nth(1).textContent())
    //     .replace(/\|/g, '')
    //     .trim();
    // console.log(confirmationNumber)
 //  await page.locator("[routerlink*='myorders']").nth(1).click()
  
    const confirmationNumber = (await page.locator('tr td label').nth(1).textContent())
        .replace(/\|/g, '').trim();
    console.log(confirmationNumber)

     await thankyouPage.clickingOnOrderHistory();
     await myordersPage.totalOrders.first().waitFor({ state: 'visible' });
    
    // console.log(await myordersPage.totalOrders.allTextContents())

    const count = await myordersPage.totalOrders.count()
    for (let i = 0; i < count; i++) {
        const order = myordersPage.totalOrders.nth(i)
        const orderNumber = (await order.locator('th').innerText()).trim()
        if (orderNumber === confirmationNumber) {
            await order.getByRole('button', { name: 'View', exact: true }).click()
            break
        }

    }
    await expect(page.locator('.email-title')).toBeVisible()
    console.log(await page.locator('.email-title').textContent())
})
}

customtest(`Selecting the item from the ecommerce app`, async ({ page,testDataOrder }) => {

    const poManager = new POManager(page);
    const loginPage = poManager.getLoginPage();
     const dashboardPage = poManager.getDashboardPage()
    const checkoutPage = poManager.getCheckoutPage()
    const paymentPage = poManager.getPaymentPage()
    const thankyouPage = poManager.getThankyouPage()
    const myordersPage = poManager.getMyOrdersPage()

    // const userName = "kameswaridd@gmail.com";
    // const password = "Password123";
    // const desiredProductName = 'ZARA COAT 3'

    await loginPage.goTo()
    await loginPage.validLogin(testDataOrder.userName, testDataOrder.password)

    await expect(dashboardPage.products.first()).toBeVisible()
    await dashboardPage.searchProduct(testDataOrder.desiredProductName);
    await dashboardPage.clickingOnCart();

    await expect(checkoutPage.myCart).toHaveText(testDataOrder.desiredProductName)
    console.log(await checkoutPage.myCart.textContent());
    //await page.locator('li.totalRow')[2].click()
    await checkoutPage.clickingOnCheckout();

    await paymentPage.fillingCreditCard();
    await expect(page.locator('input.input').nth(4)).toHaveValue(testDataOrder.userName)
    console.log(await page.locator('input.input').nth(4).inputValue())

    await paymentPage.selectingCountry();
    await expect(paymentPage.selectCountry).toHaveValue('India')
    console.log(await paymentPage.selectCountry.inputValue())
    await paymentPage.placingOrder();

})
