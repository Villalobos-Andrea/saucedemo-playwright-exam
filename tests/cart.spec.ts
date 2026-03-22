import { test, expect } from '../fixtures/page.fixture';
import { loginAsStandardUser, TEST_DATA } from '../utils/helpers';

/**
 * Shopping cart functionality tests
 * Tests adding/removing products and cart interactions
 */

test.describe('Shopping Cart', () => {
    test.beforeEach(async ({ basePage, loginPage }) => {
        await basePage.goto();
        await loginAsStandardUser(loginPage);
    });

    test.describe('Cart Display', () => {
        test('product appears in the cart page', async ({ inventoryPage, basePage, cartPage }) => {
            const expectedProductName = await inventoryPage.getBackpackName();

            await inventoryPage.addBackpackToCart();
            await basePage.clickOnShoppingCart();

            // product added to cart should appear in cart page
            const cartProductName = cartPage.page.locator('.inventory_item_name');
            await expect(cartProductName).toHaveText(expectedProductName!);
        });

        test('correct product details appear in cart page', async ({ inventoryPage, basePage, page }) => {
            await inventoryPage.addBackpackToCart();
            const expectedProductName = await inventoryPage.getBackpackName();
            const expectedProductPrice = await inventoryPage.getBackpackPrice();

            await basePage.clickOnShoppingCart();

            // Product details in cart should match those from inventory page
            const cartProductName = page.locator('.inventory_item_name');
            const cartProductPrice = page.locator('.inventory_item_price');
            await expect(cartProductName).toHaveText(expectedProductName!);
            await expect(cartProductPrice).toHaveText(expectedProductPrice!);
        });
    });

    test.describe('Cart Management', () => {
        test('can remove product from cart', async ({ inventoryPage, basePage, cartPage }) => {
            await inventoryPage.addBackpackToCart();
            await basePage.clickOnShoppingCart();

            await cartPage.clickRemoveButton();

            // product should be removed from cart
            const cartItem = cartPage.page.locator('.cart_item');
            await expect(cartItem).toHaveCount(0);
        });

        test('user can continue shopping from cart page', async ({ inventoryPage, basePage, cartPage, page }) => {
            await inventoryPage.addBackpackToCart();
            await basePage.clickOnShoppingCart();

            await cartPage.clickContinueShoppingButton();

            // User is navigated back to inventory page
            const inventoryTitle = page.locator('.title');
            await expect(inventoryTitle).toHaveText('Products');
        });
    });

    test.describe('Checkout Navigation', () => {
        test('checkout attempt with no items in cart', async ({ basePage, cartPage, page }) => {
            // No items added to cart
            await basePage.clickOnShoppingCart();
            await cartPage.clickCheckoutButton();

            // User cannot proceed to checkout, remains in cart page
            const checkoutTitle = page.locator('.title');
            await expect(checkoutTitle).toHaveText('Your Cart');
        });
    });
});