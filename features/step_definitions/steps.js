const {Given, When, Then }  = require('@cucumber/cucumber')
const { expect } = require('@playwright/test')
const {POManager} = require('../../PageObjects/POManager')
const playwright = require('@playwright/test');


Given('I am a registered user and I have logged in to the ecommerce application with {string} and {string}', {timeout: 60000}, async function (userName, password) {
    
      
    await this.poManager.getLoginPage().goTo()
    await this.poManager.getLoginPage().validLogin(userName, password)
});

// When('I add the product {string} to the cart', async function (desiredProductName) {
//     await expect(this.poManager.getDashboardPage().products.first()).toBeVisible()
//     await this.poManager.getDashboardPage().searchProduct(desiredProductName);
//     await this.poManager.getDashboardPage().clickingOnCart();
// });

When('I add the product {string} to the cart', async function (desiredProductName) {
  this.desiredProductName = desiredProductName;

  await expect(this.poManager.getDashboardPage().products.first()).toBeVisible();
  await this.poManager.getDashboardPage().searchProduct(desiredProductName);
  await this.poManager.getDashboardPage().clickingOnCart();
});


// When('I proceed to checkout', async function () {
//     const desiredProductName = Any;
//     await expect(this.poManager.getCheckoutPage().myCart).toHaveText(desiredProductName)
//     console.log(await this.poManager.getCheckoutPage().myCart.textContent());
//     //await this.page.locator('li.totalRow')[2].click()
//     await this.poManager.getCheckoutPage().clickingOnCheckout();
// });

When('I proceed to checkout', async function () {
  await expect(this.poManager.getCheckoutPage().myCart)
    .toHaveText(this.desiredProductName);

  await this.poManager.getCheckoutPage().clickingOnCheckout();
});

Then('the order should be placed successfully with same user {string}', async function (userName) {
    await this.poManager.getPaymentPage().fillingCreditCard();
    await expect(this.poManager.getPaymentPage().userNameInput).toHaveValue(userName);
  //  await expect(this.poManager.getPaymentPage().userNameInput).toHaveValue(userName)
    console.log(await this.poManager.getPaymentPage().userNameInput.inputValue())

    await this.poManager.getPaymentPage().selectingCountry();
    await expect(this.poManager.getPaymentPage().selectCountry).toHaveValue('India')
    console.log(await this.poManager.getPaymentPage().selectCountry.inputValue())
    await this.poManager.getPaymentPage().placingOrder();
});

Then('the order details should be visible in the orders page', async function () {
    const page = this.poManager.page;
    const thankyouPage = this.poManager.getThankyouPage();
    const myOrdersPage = this.poManager.getMyOrdersPage();

    await expect(thankyouPage.thankyouOrder).toContainText('Thankyou for the order.');
    console.log(await thankyouPage.thankyouOrder.textContent());

    const confirmationNumber = (await this.page.locator('tr td label').nth(1).textContent())
        .replace(/\|/g, '').trim();
    console.log(confirmationNumber);

    await thankyouPage.clickingOnOrderHistory();
    await myOrdersPage.totalOrders.first().waitFor({ state: 'visible' });

    const count = await myOrdersPage.totalOrders.count();
    for (let i = 0; i < count; i++) {
        const order = myOrdersPage.totalOrders.nth(i);
        const orderNumber = (await order.locator('th').innerText()).trim();
        if (orderNumber === confirmationNumber) {
            await order.getByRole('button', { name: 'View', exact: true }).click();
            break;
        }

    }
    await expect(this.page.locator('.email-title')).toBeVisible();
    console.log(await this.page.locator('.email-title').textContent());
});


Given('I am on the login page of the practice application', async function () {
 await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');

});

When('I enter invalid credentials {string} and {string}', async function (userName, password) {
  const userNameInput = await this.page.locator('input#username');
  const passwordInput = await this.page.locator('input#password');
  const signInButton = await this.page.locator('input#signInBtn');

    await this.page.locator('input#username').fill(userName);
    await this.page.locator('input#password').fill(password);
    await this.page.locator('input#signInBtn').click();


});

Then('an error message should be displayed', async function () {

    const errorMessage = await this.page.locator('div.alert-danger').textContent();
    console.log(errorMessage);
    await expect(this.page.locator('div.alert-danger')).toContainText('Incorrect');
 

});
