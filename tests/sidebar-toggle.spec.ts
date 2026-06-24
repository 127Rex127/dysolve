import { test, expect } from '@playwright/test'

test.describe('Sidebar toggle — reader text should go full width', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    // Navigate to input view via the hero "Start Reading" button
    await page.getByRole('button', { name: /start reading/i }).nth(1).click()

    // Load sample text
    await page.getByRole('button', { name: /try sample/i }).click()

    // Wait for reader view to appear
    await page.locator('article.reader-article').waitFor({ state: 'visible' })
  })

  test('reader text fills full width when sidebar is closed', async ({ page }) => {
    const readerContainer = page.locator('[data-testid="reader-container"]')

    // Sidebar is open by default — reader container should have 320px right margin
    await expect(readerContainer).toHaveCSS('margin-right', '320px')

    // Click the sidebar toggle button to close it
    await page.getByRole('button', { name: /close settings/i }).click()

    // Wait for the CSS transition
    await page.waitForTimeout(400)

    // Reader container should now have no right margin (full width)
    await expect(readerContainer).toHaveCSS('margin-right', '0px')
  })

  test('reader text shrinks back when sidebar is reopened', async ({ page }) => {
    const readerContainer = page.locator('[data-testid="reader-container"]')

    // Close sidebar
    await page.getByRole('button', { name: /close settings/i }).click()
    await page.waitForTimeout(400)
    await expect(readerContainer).toHaveCSS('margin-right', '0px')

    // Reopen sidebar
    await page.getByRole('button', { name: /open settings/i }).click()
    await page.waitForTimeout(400)
    await expect(readerContainer).toHaveCSS('margin-right', '320px')
  })
})
