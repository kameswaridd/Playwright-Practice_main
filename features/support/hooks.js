const {After, Before, BeforeStep, AfterStep, Status} = require('@cucumber/cucumber');
const playwright = require('@playwright/test')
const {POManager} = require('../../PageObjects/POManager')

// Synchronous
Before(async function () {

    const browser = await playwright.chromium.launch({ headless: false })
    const context =  await browser.newContext()
    this.page = await context.newPage()
    this.poManager = new POManager(this.page);
  
});

After(async function () {
   console.log("Closing the browser after the test execution");
});

BeforeStep(async function () {
  
});

AfterStep (async function ({result}) {
  // This hook will be executed after all steps, and take a screenshot on step failure
  if (result.status === Status.FAILED) {
    await this.page.screenshot({ path: 'screenshot1.png', fullPage: true });
  }
});