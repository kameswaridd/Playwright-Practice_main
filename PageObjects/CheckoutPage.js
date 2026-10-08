class CheckoutPage{

    constructor(page){

        this.page = page;
        this.myCart = page.locator('.cartSection h3');
    }

   async clickingOnCheckout() {

     await this.page.locator('li.totalRow').getByRole('button', { name: 'Checkout' }).click();


    }
}

module.exports ={CheckoutPage}