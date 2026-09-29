const { test, expect } = require('@playwright/test')

test('First assignment', async ({ page }) => {

    await page.goto("https://eventhub.rahulshettyacademy.com")

    await page.getByPlaceholder("you@email.com").fill("Hello@gmail.com")
    await page.getByLabel("Password").fill("Password123!")
    await page.locator("#login-btn").click()
    await expect(page.locator("a h3").first()).toBeVisible()

    await page.getByRole('button', { name: 'Admin' }).click();
    await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
    await page.getByTestId('event-title-input').fill('Test Event 9-22-2026');

    await page.getByPlaceholder("Describe the event…").fill("Creating this event for testing")
    await page.locator("#category").selectOption({ value: 'Workshop' })

    await page.locator('#city').fill("Louisville")
    await page.locator('#venue').fill("Kameswari, Louisville, KY")
    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-09-23T01:30');
    await page.getByRole('spinbutton', { name: 'Price ($)*' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Total Seats*' }).fill('50');
  await page.locator('add-event-btn').click();

    await page.pause(2000)




})