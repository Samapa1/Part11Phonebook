const { test, describe, expect, beforeEach } = require('@playwright/test')

describe('Phonebook', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173/')
  })
  test('front page can be opened', async ({ page }) => {
    await expect(page.getByText('Phonebook')).toBeVisible()
    await expect(page.getByText('add a new:')).toBeVisible()
  })
})