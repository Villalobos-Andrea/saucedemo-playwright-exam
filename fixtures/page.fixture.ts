import { test as base, expect } from '@playwright/test';
import { basePage } from '../pages/basepage';
import { LoginPage } from '../pages/login';
import { InventoryPage } from '../pages/inventory';
import { cartPage } from '../pages/cart';
import { checkoutPage } from '../pages/checkout';

type PageFixtures = {
  home: basePage;
  login: LoginPage;
  inventory: InventoryPage;
  cart: cartPage;
  checkout: checkoutPage;
};

export const test = base.extend<PageFixtures>({
  home: async ({ page }, use) => {
    await use(new basePage(page));
},

  login: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  inventory: async ({ page }, use) => {
    await use(new InventoryPage(page));
  },

  cart: async ({ page }, use) => {
    await use(new cartPage(page));
  },

  checkout: async ({ page }, use) => {
    await use(new checkoutPage(page));
  },
});

export { expect };