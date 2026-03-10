import { Page, Locator } from '@playwright/test';
import { BasePage } from './basepage';

/**
 * Checkout Page Object
 * Contains all elements and actions related to the checkout page
 */
export class CheckoutPage extends BasePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly postalCodeInput: Locator;
    readonly continueBtn: Locator;
    readonly cancelBtn: Locator;
    readonly finishBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.postalCodeInput = page.getByRole('textbox', { name: 'Zip/Postal Code' });
        this.continueBtn = page.getByRole('button', { name: 'Continue' });
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
        this.finishBtn = page.getByRole('button', { name: 'Finish' });
    }

    /**
     * Enter first name in the checkout form
     * @param firstName - The first name to enter
     */
    async enterFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    /**
     * Enter last name in the checkout form
     * @param lastName - The last name to enter
     */
    async enterLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }

    /**
     * Enter postal code in the checkout form
     * @param postalCode - The postal code to enter
     */
    async enterPostalCode(postalCode: string) {
        await this.postalCodeInput.fill(postalCode);
    }

    /**
     * Click the continue button to proceed to order review
     */
    async clickContinueButton() {
        await this.continueBtn.click();
    }

    /**
     * Click the cancel button to abort checkout
     */
    async clickCancelButton() {
        await this.cancelBtn.click();
    }

    /**
     * Click the finish button to complete the purchase
     */
    async clickFinishButton() {
        await this.finishBtn.click();
    }
}