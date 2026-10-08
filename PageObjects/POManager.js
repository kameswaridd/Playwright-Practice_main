
const { LoginPage } = require('./LoginPage')
const { DashboardPage } = require('./DashboardPage')
const { CheckoutPage } = require('./CheckoutPage')
const { MyOrdersPage } = require('./MyOrdersPage')
const { PaymentPage } = require('./PaymentPage')
const { ThankyouPage } = require('./ThankyouPage')


class POManager {

    constructor(page) {
        this.page = page;
        this.loginPage = new LoginPage(this.page)
        this.dashboardPage = new DashboardPage(this.page)
        this.checkoutPage = new CheckoutPage(this.page)
        this.paymentPage = new PaymentPage(this.page)
        this.thankyouPage = new ThankyouPage(this.page)
        this.myordersPage = new MyOrdersPage(this.page)
   }

   getLoginPage(){
    return this.loginPage;
   }
   getDashboardPage(){
    return this.dashboardPage;
   }
   getCheckoutPage(){
    return this.checkoutPage;
   }

   getPaymentPage(){
    return this.paymentPage;
   }
   getThankyouPage()
   {
    return this.thankyouPage;
   }
   getMyOrdersPage(){
    return this.myordersPage;
   }
   getPage() {
  return this.page;
}

}

module.exports = { POManager }