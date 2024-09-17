const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Phonebook', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')
    await page.goto('http://localhost:5173')
  })
  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('Phonebook')).toBeVisible()
    await expect(page.getByText('add a new:')).toBeVisible()
  })
  test('a new person can be added', async ({ page }) => {
    await page.getByTestId('name').fill('Merja')
    await page.getByTestId('number').fill('02-13456353')
    await page.getByRole('button', { name: 'add' }).click()
    const locator1 = await page.getByText('Merja').first()
    await expect(locator1).toBeVisible()
    const locator2 = await page.getByText('02-13456353').last()
    await expect(locator2).toBeVisible()

  })
})