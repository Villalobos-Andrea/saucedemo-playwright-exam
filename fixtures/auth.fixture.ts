import { test as base } from '@playwright/test';
import { pageFixtures } from './page.fixture';
import { TEST_DATA } from './test-data';

export const test = base
  .extend(pageFixtures)
  .extend({
    loggedInPage: async ({ loginPage, page }, use) => {
      await loginPage.goto();
      await loginPage.enterUsername(TEST_DATA.credentials.standard_user.username);
      await loginPage.enterPassword(TEST_DATA.credentials.standard_user.password);
      await loginPage.clickSignInFormButton();

      await use(page);
    },
  });

export { expect } from '@playwright/test';
