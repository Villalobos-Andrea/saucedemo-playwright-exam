import { Page, Locator } from '@playwright/test';
import { basePage } from './basepage';

export class checkoutPage extends basePage {
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator
    readonly postalCodeInput: Locator;
    readonly continueBtn: Locator
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

    async enterFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
    }

    async enterLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
    }           

    async enterPostalCode(postalCode: string) {
        await this.postalCodeInput.fill(postalCode);
    }

    async clickContinueButton() {
        await this.continueBtn.click();
    }

    async clickCancelButton() {
        await this.cancelBtn.click();
    }

    async clickFinishButton() {
        await this.finishBtn.click();
    }

}