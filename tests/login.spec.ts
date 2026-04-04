import { test, expect } from '../fixtures/page.fixture';
import { loginCredentials } from '../test-data/login-credentials';

test.beforeEach(async ({ home }) => {
    await home.goto();
});

test('user can login with valid credentials', async ({ login , inventory }) => {
    await login.enterUsername(loginCredentials.credentials.standard_user.username);
    await login.enterPassword(loginCredentials.credentials.standard_user.password);
    await login.clickSignInFormButton();

    await expect(inventory.page).toHaveURL('https://www.saucedemo.com/inventory.html');
});




