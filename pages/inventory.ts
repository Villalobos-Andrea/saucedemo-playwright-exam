import { Page, Locator } from '@playwright/test';
import { basePage } from './basepage';

export class InventoryPage extends basePage {
    readonly backpackAddToCartBtn: Locator;
    readonly bikeLightAddToCartBtn: Locator;
    readonly boltTShirtAddToCartBtn: Locator;
    readonly fleeceJacketAddToCartBtn: Locator
    readonly onesieAddToCartBtn: Locator;
    readonly redTShirtAddToCartBtn: Locator

    readonly backpackRemoveFromCartBtn: Locator;
    readonly bikeLightRemoveFromCartBtn: Locator;
    readonly boltTShirtRemoveFromCartBtn: Locator;
    readonly fleeceJacketRemoveFromCartBtn: Locator
    readonly onesieRemoveFromCartBtn: Locator;
    readonly redTShirtRemoveFromCartBtn: Locator;

    readonly backpackName: Locator;
    readonly backpackPrice: Locator;

    constructor(page: Page) {
        super(page);

        // Locators for add to cart buttons for each product
        this.backpackAddToCartBtn = page.locator('#add-to-cart-sauce-labs-backpack');
        this.bikeLightAddToCartBtn = page.locator('#add-to-cart-sauce-labs-bike-light');
        this.boltTShirtAddToCartBtn = page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
        this.fleeceJacketAddToCartBtn = page.locator('#add-to-cart-sauce-labs-fleece-jacket');
        this.onesieAddToCartBtn = page.locator('#add-to-cart-sauce-labs-onesie');
        this.redTShirtAddToCartBtn = page.locator('#add-to-cart-test.allthethings()-t-shirt-(red)');

        // Locators for remove from cart buttons for each product
        this.backpackRemoveFromCartBtn = page.locator('#remove-sauce-labs-backpack');
        this.bikeLightRemoveFromCartBtn = page.locator('#remove-sauce-labs-bike-light');
        this.boltTShirtRemoveFromCartBtn = page.locator('#remove-sauce-labs-bolt-t-shirt');
        this.fleeceJacketRemoveFromCartBtn = page.locator('#remove-sauce-labs-fleece-jacket');
        this.onesieRemoveFromCartBtn = page.locator('#remove-sauce-labs-onesie');
        this.redTShirtRemoveFromCartBtn = page.locator('#remove-test.allthethings()-t-shirt-(red)');

        this.backpackName = page.locator('#item_4_title_link .inventory_item_name');
        this.backpackPrice = page.locator('.inventory_item').filter({ hasText: 'Sauce Labs Backpack' }).locator('.inventory_item_price');

    }

    async addBackpackToCart() {
        await this.backpackAddToCartBtn.click();
    }

    async getBackpackName() {
        return await this.backpackName.textContent();
    }

    async getBackpackPrice() {
        return await this.backpackPrice.textContent();
    }

    async addBikeLightToCart() {
        await this.bikeLightAddToCartBtn.click();
    }

    async addBoltTShirtToCart() {
        await this.boltTShirtAddToCartBtn.click();
    }

    async addFleeceJacketToCart() {
        await this.fleeceJacketAddToCartBtn.click();
    }

    async addOnesieToCart() {
        await this.onesieAddToCartBtn.click();
    }

    async addRedTShirtToCart() {
        await this.redTShirtAddToCartBtn.click();
    }

}