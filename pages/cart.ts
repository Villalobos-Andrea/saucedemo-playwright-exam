import { Page, Locator } from '@playwright/test';
import { basePage } from './basepage';


export class cartPage extends basePage {

    readonly checkoutBtn: Locator;
    readonly continueShoppingBtn: Locator;
    readonly cartItem: Locator;
    readonly removeBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.checkoutBtn = page.getByRole('button', { name: 'Checkout' });
        this.continueShoppingBtn = page.getByRole('button', { name: 'Continue Shopping' });
        this.cartItem = page.locator('.cart_item');
        this.removeBtn = page.locator('.cart_item').getByRole('button', { name: 'Remove' });
    }

    async clickCheckoutButton() {
        await this.checkoutBtn.click();
    }

    async clickContinueShoppingButton() {
        await this.continueShoppingBtn.click();
    }

    async clickRemoveButton() {
        await this.removeBtn.click();
    }

}