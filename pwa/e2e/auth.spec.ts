import { test, expect } from '@playwright/test';

test('complete auth flow', async ({ page }) => {
    const randomSuffix = Math.floor(Math.random() * 100000);
    const email = `e2e_${randomSuffix}@example.com`;
    const password = 'Password123!';

    // 1. Signup
    await page.goto('/signup');

    await page.fill('input#first_name', 'E2E');
    await page.fill('input#last_name', 'TestUser');
    await page.fill('input#phone', '1234567890');
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);

    // Click checkbox (label click is safer for hidden inputs)
    await page.click('label[for="terms"]');

    await page.click('button[type="submit"]');

    // Should redirect to login
    await expect(page).toHaveURL(/\/login/);

    // 2. Login
    await page.fill('input[type="email"]', email);
    await page.fill('input[type="password"]', password);
    await page.click('button[type="submit"]');

    // Expect dashboard
    await expect(page).toHaveURL(/\/dashboard/);

    // Verify welcome message (optional, might need adaptation based on UI)
    // await expect(page.getByText('Welcome')).toBeVisible(); 
});
