import { test, expect } from '../fixtures/page.fixture';

test.beforeEach(async ({ home, login }) => {
    await home.goto();
    await login.enterUsername('standard_user');
    await login.enterPassword('secret_sauce');
    await login.clickSignInFormButton();
});

test('add product to cart', async ({ inventory }) => {
    await inventory.addBackpackToCart();
    const badgeText = await inventory.getShoppingCartBadgeText();
    // Product is added to cart and cart badge shows 1 item.
    expect(badgeText).toBe('1');
});

test('add multiple products to cart', async ({ inventory }) => {
    await inventory.addBackpackToCart();
    await inventory.addBikeLightToCart();
    const badgeText = await inventory.getShoppingCartBadgeText();
    // Products are added to cart and cart badge shows 2 items.
    expect(badgeText).toBe('2');
});

test('user cannot add same product to cart multiple times', async ({ inventory }) => {
    await inventory.addBackpackToCart();
    // Remove button is visible for the product added to cart, which means user cannot add same product to cart multiple times.
    await expect(inventory.backpackRemoveFromCartBtn).toBeVisible();
    const badgeText = await inventory.getShoppingCartBadgeText();
    // Product is added to cart and cart badge shows 1 item. User cannot add same product to cart multiple times.
    expect(badgeText).toBe('1');
});

