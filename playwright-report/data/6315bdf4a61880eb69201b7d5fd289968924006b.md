# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\ecommerceapppractice.spec.js >> Ecommerce app practice 
- Location: tests\ecommerceapppractice.spec.js:4:1

# Error details

```
TypeError: page.locator(...).first(...).waitUntil is not a function
```

# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - generic: Ecom
        - generic [ref=e9]:
          - link " dummywebsite@rahulshettyacademy.com" [ref=e11] [cursor=pointer]:
            - /url: emailto:dummywebsite@rahulshettyacademy.com
            - generic [ref=e12]: 
            - text: dummywebsite@rahulshettyacademy.com
          - generic [ref=e13]:
            - link "" [ref=e14] [cursor=pointer]:
              - /url: "#"
            - link "" [ref=e16] [cursor=pointer]:
              - /url: "#"
            - link "" [ref=e18] [cursor=pointer]:
              - /url: "#"
            - link "" [ref=e20] [cursor=pointer]:
              - /url: "#"
    - generic [ref=e22]:
      - generic [ref=e23]:
        - heading "We Make Your Shopping Simple" [level=3]
        - heading [level=1] [ref=e24]:
          - text: Practice Website for
          - emphasis [ref=e25]: Rahul Shetty Academy
          - text: Students
        - link "Register" [ref=e26] [cursor=pointer]:
          - /url: "#/auth/register"
      - generic [ref=e28]:
        - paragraph [ref=e29]:
          - generic [ref=e30]: Register to sign in with your personal account
        - generic [ref=e31]:
          - heading "Log in" [level=1] [ref=e32]
          - generic [ref=e33]:
            - generic [ref=e34]:
              - generic [ref=e35]: Email
              - textbox "email@example.com" [ref=e36]: kameswaridd@gmail.com
            - generic [ref=e37]:
              - generic [ref=e38]: Password
              - textbox "enter your passsword" [ref=e39]: Playwright123
            - button "Login" [active] [ref=e40] [cursor=pointer]
          - link "Forgot password?" [ref=e41] [cursor=pointer]:
            - /url: "#/auth/password-new"
          - paragraph [ref=e42] [cursor=pointer]: Don't have an account? Register here
    - generic [ref=e43]:
      - heading "Why People Choose Us?" [level=1] [ref=e46]
      - generic [ref=e47]:
        - generic [ref=e48]:
          - generic [ref=e49]: 
          - generic [ref=e51]:
            - heading "3546540" [level=1]
            - paragraph [ref=e52]: Successfull Orders
        - generic [ref=e53]:
          - generic [ref=e54]: 
          - generic [ref=e56]:
            - heading "37653" [level=1]
            - paragraph [ref=e57]: Customers
        - generic [ref=e58]:
          - generic [ref=e59]: 
          - generic [ref=e61]:
            - heading "3243" [level=1]
            - paragraph [ref=e62]: Sellers
      - generic [ref=e63]:
        - generic [ref=e64]:
          - generic [ref=e65]: 
          - generic [ref=e67]:
            - heading "4500+" [level=1]
            - paragraph [ref=e68]: Daily Orders
        - generic [ref=e69]:
          - generic [ref=e70]: 
          - generic [ref=e72]:
            - heading "500+" [level=1]
            - paragraph [ref=e73]: Daily New Customer Joining
  - alert "Incorrect email or password." [ref=e75]
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | const { equal } = require('assert');
  3   | 
  4   | test('Ecommerce app practice ', async ({ page }) => {
  5   | 
  6   |   // const context = await browser.newContext();
  7   |   // const page = await context.newPage();
  8   |   const products = page.locator(".card-body");
  9   |   const coat = "ZARA COAT 3";
  10  |   const email = "kameswaridd@gmail.com";
  11  |   // const email = process.env.USERNAME;
  12  |   // const pwd = process.env.PASSWORD; 
  13  |   
  14  |   await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  15  |   console.log(await page.title());
  16  |   await expect(page).toHaveTitle("Let's Shop");
  17  |   await page.locator('[formcontrolname="userEmail"]').fill(email);
  18  |   await page.locator('[formcontrolname="userPassword"]').fill("Playwright123");
  19  |   await page.locator('[name="login"]').click();
  20  | 
  21  |   await page.waitForLoadState('networkidle');
> 22  |   await page.locator(".card-body b").first().waitUntil({ state: 'visible' });
      |                                              ^ TypeError: page.locator(...).first(...).waitUntil is not a function
  23  |  // await page.locator(".card-body b").first().waitFor();
  24  |   const titles = await page.locator(".card-body b").allTextContents();
  25  |   console.log(titles);
  26  | 
  27  |   const count = await products.count();
  28  | 
  29  |   for (let i = 0; i < await count; ++i) {
  30  |     if (await products.nth(i).locator("b").textContent() === coat) {
  31  |       await products.nth(i).locator("text= Add To Cart").click();
  32  |       break;
  33  |     }
  34  |   }
  35  |   await page.locator("[routerlink*= 'cart']").click();
  36  |   await page.locator("div li").first().waitFor();
  37  |   await page.locator("h3:has-text('ZARA COAT 3')").waitFor();
  38  |   const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  39  |   expect(bool).toBeTruthy();
  40  | 
  41  |   await page.locator("//button[text()='Checkout']").click();
  42  |   const inputElement = await page.locator("input.text-validated[type='text']").first();
  43  |   console.log(await inputElement.inputValue());
  44  |   await inputElement.fill(" ");
  45  |   await inputElement.fill("4567894567891");
  46  |   await page.locator('select').nth(0).selectOption('10');
  47  |   await page.locator('select').nth(1).selectOption('20');
  48  |   await page.locator("input.input.txt").nth(1).fill('234');
  49  |   await page.locator('input.input.txt').nth(2).fill("Kameswari");
  50  |   //await page.locator('input.input.txt').nth(3).fill("cool30");
  51  |   //await page.locator("button[class*='primary']").click();  
  52  |   await page.locator('input[placeholder="Select Country"]').pressSequentially('India', { delay: 100 });
  53  |   const dropdown = await page.locator(".ta-results");
  54  |   await dropdown.waitFor({ timeout: 5000 });
  55  |   const optionsCount = await dropdown.locator('button').count();
  56  | 
  57  |   for (let i = 0; i < optionsCount; ++i) {
  58  |     // await dropdown.locator('button').nth(i).waitFor();
  59  |     const text = await dropdown.locator('button').nth(i).textContent();
  60  |     if (text === ' India') {
  61  |       await dropdown.locator('button').nth(i).click();
  62  |       break
  63  |     }
  64  |   }
  65  |   const userEmail = page.locator(".user__name").filter({ hasText: email }).first();
  66  |   console.log(await userEmail.textContent());
  67  | 
  68  |   await page.locator('a.btnn.action__submit.ng-star-inserted').click();
  69  | 
  70  |   await page.waitForLoadState("networkidle");
  71  |   await expect(page.locator(".hero-primary")).toBeVisible();
  72  |   //await expect(page.locator(".hero-primary")).toContainText("Thank");
  73  |   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  74  | 
  75  |   console.log(await page.locator(".hero-primary").textContent());
  76  | 
  77  |   const orderIdText = await page.locator("label[class='ng-star-inserted']").textContent();
  78  |   console.log(orderIdText);
  79  | 
  80  |   await page.locator('.ng-star-inserted').first().waitFor();
  81  |   const orders = await page.locator("button[routerlink*='myorders']").click();
  82  |   console.log("Order button has been clicked");
  83  | 
  84  |   const rows = await page.locator("tbody tr");
  85  | 
  86  |   for (let i = 0; i < await rows.count(); ++i) {
  87  | 
  88  |     const orderNum = await rows.nth(i).locator("th").textContent();
  89  | 
  90  |     if (orderIdText.trim().includes) orderNum.trim(); {
  91  |       await rows.nth(i).locator("button").first().click();
  92  |       break;
  93  |     }
  94  |   }
  95  |   console.log("View button has been clicked");
  96  |   // await page.pause();
  97  |   //const orderDetail = await page.locator(".col-text").textContent(); 
  98  |   // const orderDetail = await page.locator('div.col-text.-main').textContent();
  99  |   //const orderDetail = await page.locator(".col-text").first().textContent();
  100 |   await page.locator(".email-title");
  101 |   // await page.locator(".col-text").first().waitFor();
  102 |   // const orderDetail = (await page.locator(".col-text").first().textContent()).trim();
  103 |   // console.log(orderDetail);
  104 |   // await expect(orderIdText.trim()).toContain(orderDetail.trim());
  105 | 
  106 |   const emailOnOrdersPage = await page.locator(".text").textContent();
  107 |   await expect(email.includes(emailOnOrdersPage)).toBeTruthy();
  108 |   // await expect(orderIdText.includes(orderDetail)).toBeTruthy();
  109 | 
  110 | 
  111 | });
  112 | 
  113 | 
  114 | //Write a script to add these numbers as string
  115 | 
  116 | // var sum =0;
  117 | // let prices =["$10.99", "$5.50", "$20.00"]
  118 | 
  119 | // for (let i=0; i< prices.length; i++){
  120 |   
  121 | //   sum += parseFloat(prices[i].replace("$", ""));
  122 | 
```