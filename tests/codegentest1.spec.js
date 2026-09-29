import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').fill('study for playwright automation');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('prepare for interview');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('cooking');
  await expect(page.getByRole('listitem').filter({ hasText: 'prepare for interview' }).getByTestId('todo-item-toggle')).toBeVisible();
  await page.getByRole('listitem').filter({ hasText: 'study for playwright' }).getByTestId('todo-item-toggle').check();
  await page.getByTestId('toggle-all').check();
  await page.getByTestId('toggle-all').press('Enter');
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').press('Enter');
  await page.getByRole('listitem').filter({ hasText: 'study for playwright' }).getByTestId('todo-item-toggle').uncheck();
  await page.getByRole('listitem').filter({ hasText: 'prepare for interview' }).getByTestId('todo-item-toggle').uncheck();
  await page.getByRole('listitem').filter({ hasText: 'cooking' }).getByTestId('todo-item-toggle').check();
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByRole('link', { name: 'Active' }).click();
  await page.getByRole('link', { name: 'All' }).click();
});
