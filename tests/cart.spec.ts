import { test, expect } from '../fixtures/page.fixture';


test.beforeEach(async ({home, login }) => {
    await home.goto();
    await login.enterUsername('standard_user');
    await login.enterPassword('secret_sauce');
    await login.clickSignInFormButton();
});


test('product appears in the cart page', async ({ inventory, home, cart }) => {
    await inventory.addBackpackToCart();

    // Get the product name from inventory page before navigating to cart page
    const productName = await inventory.getBackpackName();

    // Navigate to cart page
    await home.clickOnShoppingCart();

    // Verify that the product added to cart appears in the cart page
    const cartProductName = cart.page.locator('.inventory_item_name');
    await expect(cartProductName).toHaveText(productName!);
});


test('can remove product from cart', async ({ inventory, home, cart }) => {
    await inventory.addBackpackToCart();

    // Navigate to cart page
    await home.clickOnShoppingCart();

    // Remove the product from cart page
    await cart.clickRemoveButton();

    // Verify that the product is removed from cart page
    const cartItem = cart.page.locator('.cart_item');
    await expect(cartItem).toHaveCount(0);
});


test('checkout attempt with no items in cart', async ({ home, cart }) => {
    // Navigate to cart page without adding any product to cart
    await home.clickOnShoppingCart();
    await cart.clickCheckoutButton();
    // Verify that user cannot proceed to checkout page when there are no items in cart.
    // Retain in cart page.
    const checkoutTitle = cart.page.locator('.title');
    await expect(checkoutTitle).toHaveText('Your Cart');
});


test('user can continue shopping from cart page', async ({ inventory, home, cart }) => {
    await inventory.addBackpackToCart();
    // Navigate to cart page
     await home.clickOnShoppingCart();
    await cart.clickContinueShoppingButton();
    // Verify that user is navigated back to inventory page when user clicks on continue shopping button in cart page.
    const inventoryTitle = inventory.page.locator('.title');
    await expect(inventoryTitle).toHaveText('Products');
});

test('correct product details appear in cart page', async ({ inventory, home, cart }) => {
    await inventory.addBackpackToCart();
    // Get the product name and price from inventory page before navigating to cart page

    const productName = await inventory.getBackpackName();
    const productPrice = await inventory.getBackpackPrice();

    // Navigate to cart page
    await home.clickOnShoppingCart();

    // Verify that the correct product details appear in cart page

    const cartProductName = cart.page.locator('.inventory_item_name');
    const cartProductPrice = cart.page.locator('.inventory_item_price');
    await expect(cartProductName).toHaveText(productName!);
    await expect(cartProductPrice).toHaveText(productPrice!);
});