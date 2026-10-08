const { test, expect } = require('@playwright/test');
const { equal } = require('assert');

test('Ecommerce app practice ', async ({ page }) => {

  // const context = await browser.newContext();
  // const page = await context.newPage();
  const products = page.locator(".card-body");
  const coat = "ZARA COAT 3";
  const email = "kameswaridd@gmail.com";
  // const email = process.env.USERNAME;
  // const pwd = process.env.PASSWORD; 
  
  await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
  console.log(await page.title());
  await expect(page).toHaveTitle("Let's Shop");
  await page.locator('[formcontrolname="userEmail"]').fill(email);
  await page.locator('[formcontrolname="userPassword"]').fill("Playwright123");
  await page.locator('[name="login"]').click();

  await page.waitForLoadState('networkidle');
  await page.locator(".card-body b").first().waitFor();
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);

  const count = await products.count();

  for (let i = 0; i < await count; ++i) {
    if (await products.nth(i).locator("b").textContent() === coat) {
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }
  await page.locator("[routerlink*= 'cart']").click();
  await page.locator("div li").first().waitFor();
  await page.locator("h3:has-text('ZARA COAT 3')").waitFor();
  const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
  expect(bool).toBeTruthy();

  await page.locator("//button[text()='Checkout']").click();
  const inputElement = await page.locator("input.text-validated[type='text']").first();
  console.log(await inputElement.inputValue());
  await inputElement.fill(" ");
  await inputElement.fill("4567894567891");
  await page.locator('select').nth(0).selectOption('10');
  await page.locator('select').nth(1).selectOption('20');
  await page.locator("input.input.txt").nth(1).fill('234');
  await page.locator('input.input.txt').nth(2).fill("Kameswari");
  //await page.locator('input.input.txt').nth(3).fill("cool30");
  //await page.locator("button[class*='primary']").click();  
  await page.locator('input[placeholder="Select Country"]').pressSequentially('India', { delay: 100 });
  const dropdown = await page.locator(".ta-results");
  await dropdown.waitFor({ timeout: 5000 });
  const optionsCount = await dropdown.locator('button').count();

  for (let i = 0; i < optionsCount; ++i) {
    // await dropdown.locator('button').nth(i).waitFor();
    const text = await dropdown.locator('button').nth(i).textContent();
    if (text === ' India') {
      await dropdown.locator('button').nth(i).click();
      break
    }
  }
  const userEmail = page.locator(".user__name").filter({ hasText: email }).first();
  console.log(await userEmail.textContent());

  await page.locator('a.btnn.action__submit.ng-star-inserted').click();

  await page.waitForLoadState("networkidle");
  await expect(page.locator(".hero-primary")).toBeVisible();
  //await expect(page.locator(".hero-primary")).toContainText("Thank");
  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

  console.log(await page.locator(".hero-primary").textContent());

  const orderIdText = await page.locator("label[class='ng-star-inserted']").textContent();
  console.log(orderIdText);

  await page.locator('.ng-star-inserted').first().waitFor();
  const orders = await page.locator("button[routerlink*='myorders']").click();
  console.log("Order button has been clicked");

  const rows = await page.locator("tbody tr");

  for (let i = 0; i < await rows.count(); ++i) {

    const orderNum = await rows.nth(i).locator("th").textContent();

    if (orderIdText.trim().includes) orderNum.trim(); {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }
  console.log("View button has been clicked");
  // await page.pause();
  //const orderDetail = await page.locator(".col-text").textContent(); 
  // const orderDetail = await page.locator('div.col-text.-main').textContent();
  //const orderDetail = await page.locator(".col-text").first().textContent();
  await page.locator(".email-title");
  // await page.locator(".col-text").first().waitFor();
  // const orderDetail = (await page.locator(".col-text").first().textContent()).trim();
  // console.log(orderDetail);
  // await expect(orderIdText.trim()).toContain(orderDetail.trim());

  const emailOnOrdersPage = await page.locator(".text").textContent();
  await expect(email.includes(emailOnOrdersPage)).toBeTruthy();
  // await expect(orderIdText.includes(orderDetail)).toBeTruthy();


});


//Write a script to add these numbers as string

// var sum =0;
// let prices =["$10.99", "$5.50", "$20.00"]

// for (let i=0; i< prices.length; i++){
  
//   sum += parseFloat(prices[i].replace("$", ""));

//   console.log(sum);

//write a script to verify that list of items on a page is sorted alphabetically

// const listOfItems = ["boat", "apple", "car", "phone"]

// for (i=0; i< listOfItems.length-1; i++) {

//   if (listOfItems[i] > listOfItems[i+1]) {

//    return false;
//   }
// }return true


/**
//  * Verifies if elements on the page matching a selector are sorted alphabetically.
//  * @param {string} selector - CSS selector for the items (e.g., 'ul > li' or '.item-name')
//  * @returns {boolean} - Returns true if sorted, false otherwise.
//  */
// function isListSorted(selector) {
//   // 1. Get all matching elements from the DOM
//   const elements = document.querySelectorAll(selector);

  // 2. Extract and trim the text from each element
  //const items = Array.from(elements).map(el => el.textContent.trim());

  // 3. Compare each item with the next item in the array
 // for (let i = 0; i < items.length - 1; i++) {
    // localeCompare returns a positive number if items[i] comes AFTER items[i + 1]
//     if (items[i].localeCompare(items[i + 1], undefined, { sensitivity: 'base' }) > 0) {
//       console.log(`Unsorted pair found: "${items[i]}" comes before "${items[i + 1]}"`);
//       return false;
//     }
//   }

//   return true;
// }

// //sort below numbers

// const listOfItems = [8,5, 4 ,9]

// listOfItems.sort((a, b) => a-b);  //assending order

// listOfItems.sort((a,b) => b-a); //descending order


// //get number of a's in your name: Kameswari

// const name = ['k','a','m','e','s','w','a','r','i'];
// let count =0;
// for (let i=0; i< name.length; i++){
  
// if (name[i] === 'a'){

//   count ++;
// }
// }
// console.log("Count is:" + count);