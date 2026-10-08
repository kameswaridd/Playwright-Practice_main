class APIUtils {


    constructor(apiContext,loginPayLoad){

       this.apiContext = apiContext;
       this.loginPayLoad = loginPayLoad;
        }

async getToken(){
    const loginResponse = await this.apiContext.post( 'https://rahulshettyacademy.com/api/ecom/auth/login', 
    {
        data: this.loginPayLoad
        }) 
    // console.log('Status:', loginResponse.status());
    // console.log('URL:', loginResponse.url());
    // console.log('Body:', await loginResponse.text());
    // expect(loginResponse.ok()).toBeTruthy()
    
       const loginResponseJson = await loginResponse.json()
       const token = await loginResponseJson.token;
       console.log(token)
       return token;

}

async createOrder(orderPayLoad) {

    let response = {};
    response.token = await this.getToken();

    const orderResponse =  await this.apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order',
      {        data: orderPayLoad,
               headers: {
                Authorization: response.token,
                'Content-Type': 'application/json'
                        }
    
        })
       // expect(orderResponse.ok()).toBeTruthy();
            const orderResponseJson = await orderResponse.json()
            // console.log(orderResponseJson)
            // console.log('Status:', orderResponse.status());
            // console.log('Body:', await orderResponse.text());
    
            const confirmationNumber = orderResponseJson.orders[0];
            response.confirmationNumber = confirmationNumber;

            return response;
}

}

module.exports = {APIUtils}