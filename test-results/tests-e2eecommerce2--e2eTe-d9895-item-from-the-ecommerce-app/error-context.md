# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\e2eecommerce2.spec.js >> @e2eTests Selecting the item from the ecommerce app
- Location: tests\e2eecommerce2.spec.js:3:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator: locator('.cartSection h3')
Expected: "ZARA COAT 3"
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toHaveText" with timeout 5000ms
  - waiting for locator('.cartSection h3')

```

```yaml
- navigation:
  - link "Automation Automation Practice":
    - /url: ""
    - heading "Automation" [level=3]
    - paragraph: Automation Practice
  - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator.":
    - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
  - list:
    - listitem:
      - button " HOME"
    - listitem
    - listitem:
      - button " ORDERS"
    - listitem:
      - button " Cart"
    - listitem:
      - button "Sign Out"
- heading "My Cart" [level=1]
- button "Continue Shopping❯"
- heading "No Products in Your Cart !" [level=1]
```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test')
  2   | 
  3   | test('@e2eTests Selecting the item from the ecommerce app', async ({ page }) => {
  4   | 
  5   |     const userName = page.locator('#userEmail')
  6   |     const password = page.locator('#userPassword')
  7   |     const logIn = page.locator('[type="submit"]')
  8   |     const products = page.locator('.card-body')
  9   |     const desiredProductName = 'ZARA COAT 3'
  10  | 
  11  |     await page.goto('https://rahulshettyacademy.com/client/#/auth/login')
  12  | 
  13  |     await userName.fill('kameswaridd@gmail.com')
  14  |     await password.fill('Password123')
  15  |     await logIn.click()
  16  | 
  17  |     // await page.waitForLoadState("networkidle")
  18  | 
  19  |     await page.locator('h5').first().waitFor()
  20  |     console.log(await page.locator('h5').allTextContents())
  21  | 
  22  |     //Order Zara coat-3 -Method:1
  23  | 
  24  |     const zataCoat3 = await page.locator('h5').nth(1)
  25  |     const addToCartButton = page.locator('.card')
  26  |         .filter({ hasText: 'ZARA COAT 3' })
  27  |         .getByRole('button', { name: 'Add To Cart' });
  28  | 
  29  |     await addToCartButton.click();
  30  |     await page.locator("[routerlink*='cart']").click()
  31  | 
  32  |     //Order Zara coat-3 -Method:2
  33  | 
  34  |     // const count = products.count()
  35  |     // for(let i=0; i< await count; ++i){
  36  | 
  37  |     //     if (await products.nth(i).locator("b").textContent() === desiredProductName){
  38  |     //         await products.nth(i).locator("b").getByRole('button', { name: 'Add To Cart' })
  39  |     //        // await products.locator("text= Add To Cart").click();
  40  |     //         break;
  41  |     //    }
  42  |     // }
  43  | 
  44  | 
> 45  |     await expect(page.locator('.cartSection h3')).toHaveText('ZARA COAT 3')
      |                                                   ^ Error: expect(locator).toHaveText(expected) failed
  46  |     console.log(await page.locator('.cartSection h3').textContent())
  47  | 
  48  |     //await page.locator('li.totalRow')[2].click()
  49  |     await page.locator('li.totalRow').getByRole('button', { name: 'Checkout' }).click()
  50  | 
  51  | 
  52  |     await page.locator('input.text-validated').nth(0).fill('1234 1234 1234 1234')
  53  |     await page.locator('select.ddl').nth(0).selectOption({ label: '06' })
  54  |     await expect(page.locator('select.ddl').first()).toHaveValue('06');
  55  |     await page.locator('select.ddl').nth(1).selectOption({ label: '20' })
  56  |     await expect(page.locator('select.ddl').nth(1)).toHaveValue('20')
  57  | 
  58  | 
  59  |     await page.locator('input.input').nth(1).fill('123')
  60  |     await page.locator('input.input').nth(2).fill('SriRam')
  61  |     await expect(page.locator('input.input').nth(4)).toHaveValue('kameswaridd@gmail.com')
  62  |     console.log(await page.locator('input.input').nth(4).inputValue())
  63  | 
  64  |     const country = await page.locator("[placeholder='Select Country']")
  65  | 
  66  |     await country.pressSequentially('ind', { delay: 150 })
  67  | 
  68  |     await page
  69  |         .locator('span.ng-star-inserted').nth(1)
  70  |         .filter({ hasText: 'India' })
  71  |         .click();
  72  |     await expect(page.locator("[placeholder='Select Country']")).toHaveValue('India')
  73  |     console.log(await page.locator("[placeholder='Select Country']").inputValue())
  74  | 
  75  |     await page.locator('.action__submit').click()
  76  | 
  77  |     //await expect(page.locator('.hero-primary')).toHaveText(' Thankyou for the order. ')
  78  | 
  79  |     await expect(page.locator('.hero-primary'))
  80  |         .toContainText('Thankyou for the order.')
  81  | 
  82  |     console.log(await page.locator('.hero-primary').textContent())
  83  | 
  84  |     const confirmationNumber = (await page.locator('tr td label').nth(1).textContent())
  85  |         .replace(/\|/g, '')
  86  |         .trim();
  87  |     console.log(confirmationNumber)
  88  |     await page.locator("[routerlink*='myorders']").nth(1).click()
  89  | 
  90  |    await page.locator('tbody tr').first().waitFor()
  91  |     //await page.waitForLoadState("networkidle")
  92  |     const totalOrders = page.locator('tbody tr')
  93  |     const orderTexts = await totalOrders.allTextContents()
  94  |    // console.log(orderTexts)
  95  |     const count = await totalOrders.count()
  96  |     for (let i = 0; i < count; i++) {
  97  |         const order = totalOrders.nth(i)
  98  |         const orderNumber = (await order.locator('th').innerText()).trim()
  99  | 
  100 |         if (orderNumber === confirmationNumber) {
  101 |             await order.getByRole('button', { name: 'View', exact: true }).click()
  102 |             break
  103 |         }
  104 |     }
  105 | 
  106 |     // const matchingOrder = totalOrders.filter({ hasText: confirmationNumber })
  107 |     // await expect(matchingOrder).toBeVisible();
  108 |     // await matchingOrder.getByRole('button', { name: 'View', exact: true }).click();
  109 | 
  110 |     await expect(page.locator('.email-title')).toBeVisible()
  111 |     console.log(await page.locator('.email-title').textContent())
  112 |  
  113 | 
  114 | 
  115 |    
  116 | })
```