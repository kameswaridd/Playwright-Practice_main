//const { test, expect } = require('@playwright/test')
const {test} = require('@playwright/test')

exports.customtest = test.extend({
testDataOrder: {
     
    userName: "kameswaridd@gmail.com",
    password: "Password123",
    desiredProductName: "ZARA COAT 3"

}

})