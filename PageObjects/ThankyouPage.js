class ThankyouPage {

    constructor(page) {

        this.page = page;

        this.thankyouOrder = page.locator('.hero-primary')
        this.orderHistoryLink = page.locator("[routerlink*='myorders']").nth(1)
    }

    // async confirmation() {

    //     const confirmationNumber = (await this.page.locator('tr td label').nth(1).textContent())
    //         .replace(/\|/g, '').trim();
    //         return confirmationNumber;
    //    // console.log(confirmationNumber)
    // }

    async clickingOnOrderHistory() {
        await this.orderHistoryLink.click()

    }

}

module.exports = { ThankyouPage }