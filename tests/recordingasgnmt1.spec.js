import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/login');
  await page.getByRole('textbox', { name: 'Email' }).fill('Hello@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('Password123!');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByRole('button', { name: 'Admin' }).click();
  await page.getByRole('navigation').getByRole('link', { name: 'Manage Events' }).click();
  await page.getByTestId('event-title-input').fill('Test Event 9-22-2026');
  await page.getByRole('textbox', { name: 'Describe the event…' }).fill('Testing assignment');
  await page.getByLabel('Category*').selectOption('Workshop');
  await page.getByRole('textbox', { name: 'City*' }).fill('Louisville');
  await page.getByRole('textbox', { name: 'Venue*' }).fill('Kameswari, Louisville, KY');
  await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-09-23T13:11');
  await page.getByRole('spinbutton', { name: 'Price ($)*' }).fill('100');
  await page.getByRole('spinbutton', { name: 'Total Seats*' }).fill('50');
  await page.getByTestId('add-event-btn').click();
});