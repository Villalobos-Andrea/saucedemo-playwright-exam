import { test as base, Page } from '@playwright/test';
import { BasePage } from './pages/basepage';
import { LoginPage } from './pages/login';
import { InventoryPage } from './pages/inventory';
import { CartPage } from './pages/cart';
import { CheckoutPage } from './pages/checkout';

/**
 * Test fixtures for Sauce Demo automation
 * Provides initialized page objects and common test data
 */

// Test data constants
export const TEST_DATA = {
    credentials: {
        standard_user: {
            username: 'standard_user',
            password: 'secret_sauce',
        },
        locked_user: {
            username: 'locked_out_user',
            password: 'secret_sauce',
        },
    },
    checkout: {
        firstName: 'John',
        lastName: 'Doe',
        postalCode: '12345',
    },
    expectedUrls: {
        home: 'https://www.saucedemo.com/',
        inventory: 'https://www.saucedemo.com/inventory.html',
        cart: 'https://www.saucedemo.com/cart.html',
        checkout: 'https://www.saucedemo.com/checkout-step-one.html',
    },
};

/**
 * Page Objects Fixture
 * Provides initialized instances of all page objects
 */
export type PageFixtures = {
    basePage: BasePage;
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
};

export const test = base.extend<PageFixtures>({
    basePage: async ({ page }, use) => {
        const basePage = new BasePage(page);
        await use(basePage);
    },

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    inventoryPage: async ({ page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },

    cartPage: async ({ page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },

    checkoutPage: async ({ page }, use) => {
        const checkoutPage = new CheckoutPage(page);
        await use(checkoutPage);
    },
});

/**
 * Helper function to login a user
 * @param loginPage - LoginPage instance
 * @param username - User's username
 * @param password - User's password
 */
export async function loginWithCredentials(
    loginPage: LoginPage,
    username: string = TEST_DATA.credentials.standard_user.username,
    password: string = TEST_DATA.credentials.standard_user.password
) {
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    await loginPage.clickSignInFormButton();
}

/**
 * Helper function to complete checkout with information
 * @param checkoutPage - CheckoutPage instance
 * @param firstName - First name
 * @param lastName - Last name
 * @param postalCode - Postal code
 */
export async function fillCheckoutForm(
    checkoutPage: CheckoutPage,
    firstName: string = TEST_DATA.checkout.firstName,
    lastName: string = TEST_DATA.checkout.lastName,
    postalCode: string = TEST_DATA.checkout.postalCode
) {
    await checkoutPage.enterFirstName(firstName);
    await checkoutPage.enterLastName(lastName);
    await checkoutPage.enterPostalCode(postalCode);
}

export { expect } from '@playwright/test';
