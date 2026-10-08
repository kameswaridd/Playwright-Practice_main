class DashboardPage {

    constructor(page){

        this.page =page;
        this.products = page.locator('.card-body')
        this.titles = page.locator('h5')
        this.cart = page.locator("[routerlink*='cart']")
   }

   async searchProduct(desiredProductName){
 console.log(await this.titles.allTextContents())

    //Order Zara coat-3 -Method:1

   // await this.titlespage.nth(1)
    const addToCartButton = this.page.locator('.card')
        .filter({ hasText: desiredProductName })
        .getByRole('button', { name: 'Add To Cart' });

    await addToCartButton.click();

   }

   async clickingOnCart(){

    await this.cart.click()
   }

}
module.exports = {DashboardPage}