import { CheckoutPage } from '../pages/checkout';
import { LoginPage } from '../pages/login';
import { TEST_DATA } from '../fixtures/test-data';

// Re-export TEST_DATA for use in tests
export { TEST_DATA } from '../fixtures/test-data';

/**
 * Helper function to login as standard user
 * @param loginPage - LoginPage instance
 * @param username - User's username
 * @param password - User's password
 */
export async function loginAsStandardUser(
  loginPage: LoginPage,
  username: string = TEST_DATA.credentials.standard_user.username,
  password: string = TEST_DATA.credentials.standard_user.password
) {
  await loginPage.enterUsername(username);
  await loginPage.enterPassword(password);
  await loginPage.clickSignInFormButton();
}

/**
 * Helper function to login as locked user
 * @param loginPage - LoginPage instance
 * @param username - User's username
 * @param password - User's password
 */
export async function loginAsLockedUser(
  loginPage: LoginPage,
  username: string = TEST_DATA.credentials.locked_user.username,
  password: string = TEST_DATA.credentials.locked_user.password
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