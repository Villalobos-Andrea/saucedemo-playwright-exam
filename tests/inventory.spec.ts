import { test, expect } from '../fixtures/page.fixture';
import { loginAsStandardUser } from '../utils/helpers';

test.describe('Inventory - Shopping', () => {
    test.beforeEach(async ({ basePage, loginPage }) => {
        // Navigate to home page and login before each test
        await basePage.goto();
        await loginAsStandardUser(loginPage);
    });

    test('add product to cart', async ({ inventoryPage }) => {
        await inventoryPage.addBackpackToCart();

        const badgeText = await inventoryPage.getShoppingCartBadgeText();
        expect(badgeText).toBe('1');
    });

    test('add multiple products to cart', async ({ inventoryPage }) => {
        await inventoryPage.addBackpackToCart();
        await inventoryPage.addBikeLightToCart();

        const badgeText = await inventoryPage.getShoppingCartBadgeText();
        expect(badgeText).toBe('2');
    });

    test('user cannot add same product to cart multiple times', async ({ inventoryPage }) => {
        await inventoryPage.addBackpackToCart();

        // Remove button is visible for the product, indicating it's already in cart
        await expect(inventoryPage.backpackRemoveFromCartBtn).toBeVisible();
        const badgeText = await inventoryPage.getShoppingCartBadgeText();
        expect(badgeText).toBe('1');
    });
});

