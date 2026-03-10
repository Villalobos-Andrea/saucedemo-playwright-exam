import { test, expect, loginWithCredentials, TEST_DATA } from '../fixtures';

test.describe('Authentication - Login', () => {
    test.beforeEach(async ({ basePage }) => {
        await basePage.goto();
    });

    test('user can login with valid credentials', async ({ loginPage, inventoryPage }) => {
        await loginWithCredentials(loginPage);

        // User is redirected to inventory page after successful login
        await expect(inventoryPage.page).toHaveURL(TEST_DATA.expectedUrls.inventory);
    });
});




