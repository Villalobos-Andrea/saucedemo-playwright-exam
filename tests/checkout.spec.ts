import { test, expect } from '../fixtures/page.fixture';


test.beforeEach(async ({ home, login, inventory, cart }) => {
    await home.goto();
    await login.enterUsername('standard_user');
    await login.enterPassword('secret_sauce');
    await login.clickSignInFormButton();
    await inventory.addBackpackToCart();
    // Navigate to cart page
    await home.clickOnShoppingCart();
    await cart.clickCheckoutButton();
});


test('checkout form validation when fields are empty', async ({ checkout }) => {
    await checkout.clickContinueButton();
    // Error message is displayed when user tries to continue without filling the required fields in checkout form.
    const errorMessage = checkout.page.locator('.error-message-container');
    await expect(errorMessage).toHaveText('Error: First Name is required');
});


test('error displayed when first name is empty in checkout form', async ({ checkout }) => {
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    // Error message is displayed when user tries to continue without filling first name field in checkout form.
    const errorMessage = checkout.page.locator('.error-message-container');
    await expect(errorMessage).toHaveText('Error: First Name is required');
});

test('error displayed when last name is empty in checkout form', async ({ checkout }) => {
    await checkout.enterFirstName('John');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    // Error message is displayed when user tries to continue without filling last name field in checkout form.
    const errorMessage = checkout.page.locator('.error-message-container');
    await expect(errorMessage).toHaveText('Error: Last Name is required');
});

test('error displayed when postal code is empty in checkout form', async ({ checkout }) => {
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.clickContinueButton();
    // Error message is displayed when user tries to continue without filling postal code field in checkout form.
    const errorMessage = checkout.page.locator('.error-message-container');
    await expect(errorMessage).toHaveText('Error: Postal Code is required');
});

test('checkout using valid information', async ({ checkout }) => {  
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    // User is able to continue checkout process when valid information is entered in checkout form.
    const checkoutOverviewTitle = checkout.page.locator('.title');
    await expect(checkoutOverviewTitle).toHaveText('Checkout: Overview');
});


test('complete checkout process', async ({ checkout }) => {
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    const finishBtn = checkout.page.getByRole('button', { name: 'Finish' });
    await finishBtn.click();
    // User is able to complete checkout process and see checkout complete page.
    const checkoutCompleteTitle = checkout.page.locator('.title');
    await expect(checkoutCompleteTitle).toHaveText('Checkout: Complete!');
});

test('user can cancel checkout process', async ({ checkout }) => {
    await checkout.clickCancelButton();
    // User is navigated back to cart page when user clicks on cancel button in checkout page.
    const cartTitle = checkout.page.locator('.title');
    await expect(cartTitle).toHaveText('Your Cart');
});

test('order summary details displayed before completing purchase', async ({ checkout }) => {
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    // Verify that order summary details such as product name, price, tax and total are displayed in checkout overview page before completing the purchase.
    const productName = checkout.page.locator('.inventory_item_name');
    const productPrice = checkout.page.locator('.inventory_item_price');
    const tax = checkout.page.locator('.summary_tax_label');
    const total = checkout.page.locator('.summary_total_label');
    await expect(productName).toHaveText('Sauce Labs Backpack');
    await expect(productPrice).toHaveText('$29.99');
    await expect(tax).toHaveText('Tax: $2.40');
    await expect(total).toHaveText('Total: $32.39');
});


test('user can cancel checkout from overview page', async ({ checkout }) => {   
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickCancelButton();
    // User is navigated back to cart page when user clicks on cancel button in checkout overview page.
    const cartTitle = checkout.page.locator('.title');
    await expect(cartTitle).toHaveText('Your Cart');
});

test('order confirmation message displayed after successful checkout', async ({ checkout }) => {
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    await checkout.clickFinishButton();
    // Order confirmation message is displayed after successful checkout.
    const orderConfirmation = checkout.page.locator('.complete-header');
    await expect(orderConfirmation).toHaveText('Thank you for your order!');
});

test('cart is empty after completing checkout', async ({ checkout }) => {
    await checkout.enterFirstName('John');
    await checkout.enterLastName('Doe');
    await checkout.enterPostalCode('12345');
    await checkout.clickContinueButton();
    await checkout.clickFinishButton();
    // Cart is empty after completing checkout and cart badge is not visible.
    await checkout.isShoppingCartBadgeVisible();
});

test('user cannot access checkout overview directly without entering info', async ({ checkout }) => {
    // Navigate to checkout overview page directly without entering information in checkout form.
    await checkout.page.goto('https://www.saucedemo.com/checkout-step-two.html');
    // Verify that user cannot access checkout overview page directly without entering information in checkout form. User should be redirected back to checkout information page.
    const checkoutInfoTitle = checkout.page.locator('.title');
    await expect(checkoutInfoTitle).toHaveText('Checkout: Your Information');
});
