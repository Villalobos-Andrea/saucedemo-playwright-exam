import { test, expect } from '../fixtures/page.fixture';
import { loginAsLockedUser, loginAsStandardUser, TEST_DATA } from '../utils/helpers';

test.describe('Authentication - Login', () => {
    test.beforeEach(async ({ basePage }) => {
        await basePage.goto();
    });

    test('user can login with valid credentials', async ({ loginPage, inventoryPage }) => {
        await loginAsStandardUser(loginPage);

        // User is redirected to inventory page after successful login
        await expect(inventoryPage.page).toHaveURL(TEST_DATA.expectedUrls.inventory);
    });

       test('user cannot login with locked account', async ({ loginPage, inventoryPage }) => {
        await loginAsLockedUser(loginPage);

        // User stays on login page and sees error message
        await expect(loginPage.page).toHaveURL(TEST_DATA.expectedUrls.home);
        await expect(loginPage.errorMessage).toBeVisible();
        await expect(loginPage.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.');
        await expect(inventoryPage.page).not.toHaveURL(TEST_DATA.expectedUrls.inventory);
    });
});




