import { Page } from "playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutsPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: "Using the Grid" })
        await usingTheGridForm.getByRole('textbox', { name: "Email" }).fill(email)
        await usingTheGridForm.getByRole('textbox', { name: "Password" }).fill(password)
        await usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true })
        await usingTheGridForm.getByRole('button').click()
    }
    /**
     * This will help ypu remember what does what in the test, and when you hover over the test this will appear
     * @param name - User name
     * @param email - User email
     * @param rememberMe - Does user want to be saved
     */
    async submitInlineFormFormWithNameEmailAndCheckbox(name: string, email: string, rememberMe: boolean) {
        const inlineForm = this.page.locator('nb-card', { hasText: "Inline form" })
        await inlineForm.getByRole('textbox', { name: "Jane Doe" }).fill(name)
        await inlineForm.getByRole('textbox', { name: "email" }).fill(email)
        if (rememberMe)
            await inlineForm.getByRole('checkbox').check({ force: true })
        await inlineForm.getByRole('button').click()
    }
}