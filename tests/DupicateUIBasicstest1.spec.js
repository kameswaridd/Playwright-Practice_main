const {test, expect} = require ('@playwright/test');
const { request } = require('node:http');


test('Launching login screen', async({page}) => {

    
 const userName =  page.locator('#username')
 const password = page.locator('#password')
 const signInBtn = page.locator('#signInBtn')    
 const cardTitles =  page.locator('.card-title a')

 //to block images use this below route step...
 //page.route('**/*.{jpg, png,jpeg}', route=> route.abort());

//To get the request and response codes include these two steps:
page.on('request', request=> console.log(request.url()));
page.on('response', response => console.log(response.url(), response.status()))

     
 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log (await page.title());

//Entering invalid password
await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');
await page.locator('#username').fill('rahulshettyacademy');
await page.locator('#password').fill('abc');
await page.locator('#signInBtn').click();

//Getting text from alert window 
console.log(await page.locator('div.alert-danger').textContent());
await expect(page.locator('div.alert-danger')).toContainText("Incorrect")

// Another way of getting text from alert window
// const alert = await page.locator('div.alert-danger');
// await expect(alert).toBeVisible();
// console.log('Alert text is:', await alert.innerText());
//await expect(alert).toHaveText('Incorrect username/password.');

//Clearing the already entered details and entering new data
await userName.fill('rahulshetty');
//await page.pause(2000)
//await page.locator('#username').clear();
await userName.fill("")
//await page.pause(3000);
await userName.fill('rahulshettyacademy');
await password.fill('Learning@830$3mK2')
await signInBtn.click()

await expect(page).toHaveURL('https://rahulshettyacademy.com/angularpractice/shop')

//await page.pause(3000)
await expect (page.locator('.card-title a').first()).toBeVisible()

console.log(await cardTitles.first().textContent())
console.log(await cardTitles.nth(2).textContent())
console.log(await cardTitles.allTextContents())

});

test('Selecting dropdown options and radio buttons', async({page})=> {

 const userName =  page.locator('#username')
 const password = page.locator('#password')
 const signInBtn = page.locator('#signInBtn')    
 const cardTitles =  page.locator('.card-title a')
 const radioBtn = page.locator('label.customradio').nth(1)
 const blinkingLink = page.locator('[href*="documents"]')

await page.goto("https://rahulshettyacademy.com/loginpagePractise/")
await userName.fill('rahulshettyacademy');
await password.fill('Learning@830$3mK2')

//Choosing an option from dropdown list
console.log(await page.locator('select.form-control').selectOption("Teacher"))

//To get screenshot of the page
await page.screenshot({path: 'screenshot.png'})

await expect(page.locator('select.form-control')).toContainText("Teacher")

//To get screenshot of that locator

await page.locator('select.form-control').screenshot({path: 'partial screenshot.png'})

//Choosing radio button
//await page.locator('label.customradio').nth(1).click()
await page.locator('label.customradio').filter({ hasText: 'user' }).click()
//console.log (await page.locator('label.customradio').nth(1).isChecked())

await expect(radioBtn).toBeChecked()
console.log(await radioBtn.isChecked())
await page.locator('#okayBtn').click()

//Selecting check box

await page.locator('#terms').check()
await expect(page.locator('#terms')).toBeChecked()
await page.locator('#terms').uncheck()
expect(await page.locator('#terms').isChecked()).toBeFalsy()


//Checking for blinking text
const blinkingText = page.locator('.blinkingText')
await expect(blinkingLink).toHaveAttribute("class", "blinkingText")

})

test('Opening child window', async({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
     const blinkingLink = page.locator('[href*="documents"]')
      const userName =  page.locator('#username')
   

await page.goto("https://rahulshettyacademy.com/loginpagePractise/")

const [RSAcademy] = await Promise.all([   
context.waitForEvent('page'),
blinkingLink.click(),
])
 const emailText = await RSAcademy.locator('p.red').innerText()
//await page.pause(2000)
console.log(emailText)


//Please email us at mentor@rahulshettyacademy.com with below template to receive response


    const splitingText = emailText.split('@')
    const domain = splitingText[1].split(" ")[0]
    console.log(domain)

     // await page.pause()
   await userName.fill(domain)
   await page.pause()
   console.log (await userName.inputValue())

})
   

test.only('Visual testing capture', async({page}) => {

//    await page.goto('https://rahulshettyacademy.com')
//    expect(await page.screenshot()).toMatchSnapshot('Rahulshetty.png')

//If the website is stable without constant changes or updates, then it will pass
await page.goto("https://webdriver.io/")
expect(await page.screenshot()).toMatchSnapshot('webderiverio.png')

   })








test ('Launching google page', async({page}) => {

    await page.goto("https://google.com");

   console.log(await page.title());

   await expect(page).toHaveTitle("Google");


})