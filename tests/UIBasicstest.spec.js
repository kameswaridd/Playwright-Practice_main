const { test, expect } = require('@playwright/test');

test('First Playwright test', async ({ browser }) => {
  // chrome - plugins / cookies
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://www.google.com');
  console.log(await page.title());
  await expect(page).toHaveTitle(/Google/);

});

test('Page playwright test', async ({ page }) => {
    const userName = page.locator('[name="username"]');
    const password = page.locator('[name="password"]');
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
  //await expect(page).toHaveTitle(/rahulshettyacademy.com/loginpagePractise/);
    await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');

 // await page.locator('[value="user"]').click();
    await page.locator('[name="signin"]').click();
//  await page.locator('[style *= "block"]');   
//  console.log(await page.locator('[style *= "block"]').textContent());
//  await expect(page.locator('[style *= "block"]')).toContainText('Incorrect');

console.log(await page.locator('.card-body a').first().textContent());
console.log(await page.locator('.card-body a').nth(1).textContent());
console.log(await page.locator('.card-body a').last().textContent());
console.log(await page.locator('.card-body a').allTextContents());
});

test('Static select dropdown practice', async ({browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    console.log(await page.title());
    const userName = page.locator('[name="username"]');
    const password = page.locator('[name="password"]');
    const dropDown = page.locator('select.form-control');
    const radioButton = page.locator("//input[@type='radio' and @value='user']");
    const resumeLink = page.getByRole('link', { name: 'Free Access to InterviewQues/ResumeAssistance/Material' });

    await userName.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
  //await page.locator('select.form-control').selectOption('consult');
    console.log(await dropDown.selectOption('consult'));
    await radioButton.check();
    await page.locator('[id="okayBtn"]').click();  
    //assertions
    await expect(radioButton).toBeChecked();
    console.log(await radioButton.isChecked());
    await page.locator('[name="terms"]').click();
    await expect(page.locator('[name="terms"]')).toBeChecked();
    console.log(await page.locator('[name="terms"]').isChecked());
    await page.locator('[name="terms"]').uncheck();
    expect (await page.locator('[name="terms"]').isChecked()).toBeFalsy();
   
    const [page2] = await Promise.all([
    context.waitForEvent('page'),
    resumeLink.click(),
   ]);

   await page2.waitForLoadState();
   console.log(await page2.title());
   await expect(page2).toHaveTitle("RS Academy");
   const text = await page2.locator('.red').textContent();
   console.log(text);

    const textArray = text.split("@");
    await console.log(textArray[0]);
    await console.log(textArray[1]);
    const domain = textArray[1].split(" ")[0];
    await console.log(domain);
    await expect(domain).toBe('rahulshettyacademy.com');
    await userName.fill(domain);
    console.log(await userName.inputValue());
   

  // await page.pause();
});
