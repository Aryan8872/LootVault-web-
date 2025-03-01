import { test, expect } from '@playwright/test';

test.describe('SkinDetails Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5200/skin/67c2c29145697b243d9a59c8'); // Adjust ID dynamically if needed
  });

  test('should display product details correctly', async ({ page }) => {
    // Wait for product details to load
    await page.waitForSelector('h1');

    // Verify game title (select the h1 element explicitly)
    await expect(page.locator('h1.text-5xl')).toHaveText('Valorant skin');

    // Verify price (target span explicitly)
    await expect(page.locator('span.text-5xl')).toHaveText('1222');

    // Verify description (ensure we select only the <p> tag)
    const descriptionLocator = page.locator('p.text-gray-700');
    await expect(descriptionLocator).toHaveText('valorant vandal skin');

    // Verify image
  });
 

  test('should navigate back to homepage when back button is clicked', async ({ page }) => {
    // Use the visible text for the Link component ("Back to Homepage")
    const backButtonLocator = page.locator('text=Back to Homepage');
    
    // Wait for the back button to be visible
    await backButtonLocator.waitFor({ state: 'visible' });

    // Click the back button
    await backButtonLocator.click();
    
    // Wait until the navigation completes
    await page.waitForURL('http://localhost:5200/');
    
    // Verify we navigated back to the homepage
    await expect(page).toHaveURL('http://localhost:5200/');
  });

});
