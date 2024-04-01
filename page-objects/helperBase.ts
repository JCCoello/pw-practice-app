import { Page } from "playwright/test";

export class HelperBase {

    readonly page: Page

    constructor(page: Page) {
        this.page = page
    }
    //in this following example we are gonna hardcode a wait function for the tests from the "navigationPage"
    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }
}
