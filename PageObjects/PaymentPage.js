class PaymentPage{

constructor(page) {

    this.page = page;


        this.creditCareNum = page.locator('input.text-validated').nth(0)
        this.expMonth = page.locator('select.ddl').nth(0)
        this.expDate = page.locator('select.ddl').nth(1)
        this.cvvCode = page.locator('input.input').nth(1)
        this.nameOnCard = page.locator('input.input').nth(2)
        this.selectCountry = page.locator("[placeholder='Select Country']")
        this.placeOrder = page.locator('.action__submit')
        this.userNameInput = page.locator('input.input').nth(4);
    //    await page.locator('input.text-validated').nth(0).fill('1234 1234 1234 1234')
    //     await page.locator('select.ddl').nth(0).selectOption({ label: '06' })
    //     await expect(page.locator('select.ddl').first()).toHaveValue('06');
    //     await page.locator('select.ddl').nth(1).selectOption({ label: '20' })
    //     await expect(page.locator('select.ddl').nth(1)).toHaveValue('20')
    // await page.locator('input.input').nth(1).fill('123')
    // await page.locator('input.input').nth(2).fill('SriRam')
    // await expect(page.locator('input.input').nth(4)).toHaveValue(userName)
    // console.log(await page.locator('input.input').nth(4).inputValue())
    // const country = await page.locator("[placeholder='Select Country']")

}

async fillingCreditCard(){

        await this.creditCareNum.fill('1234 1234 1234 1234');
        await this.expMonth.selectOption({ label: '06' })
        await this.expDate.selectOption({ label: '20' })
        await this.cvvCode.fill('123')
        await this.nameOnCard.fill('SriRam')
      }

async selectingCountry(){


      const country = await this.selectCountry
      await country.pressSequentially('ind', { delay: 150 })
    
        await this.page
            .locator('span.ng-star-inserted').nth(1)
            .filter({ hasText: 'India' })
            .click();
     
}

    async placingOrder(){
        await this.placeOrder.click()
}



}
module.exports = {PaymentPage}