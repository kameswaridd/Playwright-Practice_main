const {test, expect} = require('@playwright/test')

test('Getting locator for Playwright CLI', async({page}) => {

// await page.goto("https://www.playwright.dev")
//await page.locator('.pathCardLink_NkwN').nth(1).click()
//await page.getByRole('link',{name: 'CLI documentation'}).click()
//console.log(await page.getByText('CLI documentation').textContent())



await page.goto("https://www.Rahulshettyacademy.com/AutomationPractice")

// await page.goto("https://www.playwright.dev")
// await page.goBack()
// await page.goForward()

await expect(page.locator("#displayed-text")).toBeVisible()
await page.locator('#hide-textbox').click()
await expect(page.locator("#displayed-text")).toBeHidden()

//accepting or cancelling a java pop up window

await page.on('dialog', dialog => dialog.accept())
//await page.on('dialog', dialog => dialog.dismiss())
await page.locator("#confirmbtn").click()


await page.locator('#mousehover').hover()
await page.locator("a[href*='top']").click()

//switching to an iframe
// await page.pause(2000)
const framePage = page.frameLocator("#courses-iframe")
await framePage.locator("li a[href*='lifetime-access']:visible").click()
// await page.pause(2000)

//spliting the text and getting the required text from it

const happySubscribers = await framePage.locator("div[class='text'] h2").textContent()
console.log(happySubscribers.split(" ")[1])
//Adding this comment to push it to GitHub and check if the GitHub action is working fine or not
//Adding this comment after switching to QA branch 

});