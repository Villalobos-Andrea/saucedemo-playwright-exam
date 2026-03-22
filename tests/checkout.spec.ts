import { test, expect } from '../fixtures/page.fixture';
import { loginAsStandardUser, fillCheckoutForm, TEST_DATA } from '../utils/helpers';

/**
 * Checkout process tests
 * Tests form validation, checkout completion, and error handling
 */

test.describe('Checkout Process', () => {
    test.beforeEach(async ({ basePage, loginPage, inventoryPage, cartPage }) => {
        // Navigate to home page and login
        await basePage.goto();
        await loginAsStandardUser(loginPage);

        // Add product to cart and navigate to checkout
        await inventoryPage.addBackpackToCart();
        await basePage.clickOnShoppingCart();
        await cartPage.clickCheckoutButton();
    });

    // ============================================================================
    // Form Validation Tests
    // ============================================================================

    test.describe('Form Validation', () => {
        test('checkout form validation when fields are empty', async ({ checkoutPage, page }) => {
            // Act
            await checkoutPage.clickContinueButton();

            // Assert
            const errorMessage = page.locator('.error-message-container');
            await expect(errorMessage).toHaveText('Error: First Name is required');
        });

        test('error displayed when first name is empty in checkout form', async ({ checkoutPage, page }) => {
            // Arrange
            await checkoutPage.enterLastName(TEST_DATA.checkout.lastName);
            await checkoutPage.enterPostalCode(TEST_DATA.checkout.postalCode);

            // Act
            await checkoutPage.clickContinueButton();

            // Assert
            const errorMessage = page.locator('.error-message-container');
            await expect(errorMessage).toHaveText('Error: First Name is required');
        });

        test('error displayed when last name is empty in checkout form', async ({ checkoutPage, page }) => {
            // Arrange
            await checkoutPage.enterFirstName(TEST_DATA.checkout.firstName);
            await checkoutPage.enterPostalCode(TEST_DATA.checkout.postalCode);

            // Act
            await checkoutPage.clickContinueButton();

            // Assert
            const errorMessage = page.locator('.error-message-container');
            await expect(errorMessage).toHaveText('Error: Last Name is required');
        });

        test('error displayed when postal code is empty in checkout form', async ({ checkoutPage, page }) => {
            // Arrange
            await checkoutPage.enterFirstName(TEST_DATA.checkout.firstName);
            await checkoutPage.enterLastName(TEST_DATA.checkout.lastName);

            // Act
            await checkoutPage.clickContinueButton();

            // Assert
            const errorMessage = page.locator('.error-message-container');
            await expect(errorMessage).toHaveText('Error: Postal Code is required');
        });
    });

    // ============================================================================
    // Checkout Completion Tests
    // ============================================================================

    test.describe('Checkout Completion', () => {
        test('checkout using valid information', async ({ checkoutPage, page }) => {
            // Act
            await fillCheckoutForm(checkoutPage);
            await checkoutPage.clickContinueButton();

            // Assert
            const checkoutOverviewTitle = page.locator('.title');
            await expect(checkoutOverviewTitle).toHaveText('Checkout: Overview');
        });

        test('complete checkout process', async ({ checkoutPage, page }) => {
            // Act
            await fillCheckoutForm(checkoutPage);
            await checkoutPage.clickContinueButton();
            await checkoutPage.clickFinishButton();

            // Assert
            const checkoutCompleteTitle = page.locator('.title');
            await expect(checkoutCompleteTitle).toHaveText('Checkout: Complete!');
        });
    });

    // ============================================================================
    // Order Summary Tests
    // ============================================================================

    test.describe('Order Summary', () => {
        test('order summary details displayed before completing purchase', async ({ checkoutPage, page }) => {
            // Act
            await fillCheckoutForm(checkoutPage);
            await checkoutPage.clickContinueButton();

            // Assert - Verify order summary details (product, price, tax, total)
            const productName = page.locator('.inventory_item_name');
            const productPrice = page.locator('.inventory_item_price');
            const tax = page.locator('.summary_tax_label');
            const total = page.locator('.summary_total_label');

            await expect(productName).toHaveText('Sauce Labs Backpack');
            await expect(productPrice).toHaveText('$29.99');
            await expect(tax).toHaveText('Tax: $2.40');
            await expect(total).toHaveText('Total: $32.39');
        });

        test('order confirmation message displayed after successful checkout', async ({ checkoutPage, page }) => {
            await fillCheckoutForm(checkoutPage);
            await checkoutPage.clickContinueButton();
            await checkoutPage.clickFinishButton();

            // Order confirmation message should be displayed
            const orderConfirmation = page.locator('.complete-header');
            await expect(orderConfirmation).toHaveText('Thank you for your order!');
        });

        test('cart is empty after completing checkout', async ({ checkoutPage }) => {
            await fillCheckoutForm(checkoutPage);
            await checkoutPage.clickContinueButton();
            await checkoutPage.clickFinishButton();

            // Cart badge should not be visible after checkout completion
            const isBadgeVisible = await checkoutPage.isShoppingCartBadgeVisible();
            expect(isBadgeVisible).toBe(false);
        });
    });

    // ============================================================================
    // Checkout Cancellation Tests
    // ============================================================================

    test.describe('Checkout Cancellation', () => {
        test('user can cancel checkout from overview page', async ({ checkoutPage, page }) => {
            await checkoutPage.clickCancelButton();

            // User should be redirected back to cart page
            const cartTitle = page.locator('.title');
            await expect(cartTitle).toHaveText('Your Cart');
        });

        test('user can cancel checkout process from info page', async ({ checkoutPage, page }) => {
            await checkoutPage.clickCancelButton();

            // User should be redirected back to cart page
            const cartTitle = page.locator('.title');
            await expect(cartTitle).toHaveText('Your Cart');
        });
    });

    // ============================================================================
    // Security & Access Control Tests
    // ============================================================================

    test.describe('Security & Access Control', () => {
        test('user cannot access checkout overview directly without entering info', async ({ basePage }) => {
            await basePage.page.goto('https://www.saucedemo.com/checkout-step-two.html');

            // User should be redirected back to checkout information page
            const checkoutInfoTitle = basePage.page.locator('.title');
            await expect(checkoutInfoTitle).toHaveText('Checkout: Your Information');
        });
    });
});
