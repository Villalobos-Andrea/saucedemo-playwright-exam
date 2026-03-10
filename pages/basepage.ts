import { Page, Locator } from '@playwright/test';

/**
 * Base Page Object
 * Contains common elements and functionality shared across all pages
 */
export class BasePage {
    readonly page: Page;
    readonly shoppingCartLink: Locator;
    readonly shoppingCartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartLink = page.locator('.shopping_cart_link');
        this.shoppingCartBadge = page.locator('[data-test="shopping-cart-badge"]');
    }

  
    async goto() {
        await this.page.goto('https://www.saucedemo.com/');
    }


    async clickOnShoppingCart() {
        await this.shoppingCartLink.click();
    }

   
    async getShoppingCartBadgeText() {
        return await this.shoppingCartBadge.textContent();
    }

    async isShoppingCartBadgeVisible() {
        return await this.shoppingCartBadge.isVisible();
    }
}

