import { test, expect } from '../fixtures/page.fixture';
import { loginAsStandardUser, TEST_DATA } from '../utils/helpers';

test.describe('Authentication - Login', () => {
    test.beforeEach(async ({ basePage }) => {
        await basePage.goto();
    });

    test('user can login with valid credentials', async ({ loginPage, inventoryPage }) => {
        await loginAsStandardUser(loginPage);

        // User is redirected to inventory page after successful login
        await expect(inventoryPage.page).toHaveURL(TEST_DATA.expectedUrls.inventory);
    });
});




