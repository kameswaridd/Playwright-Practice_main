class MyOrdersPage{


    constructor(page){
        this.page = page;
        this.totalOrders = page.locator('tbody tr')

    }

    // async totalOrderDetails(){

    //   await this.totalOrders;
    // }
}

module.exports ={MyOrdersPage}