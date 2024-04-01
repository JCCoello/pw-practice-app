import { Locator, Page } from "playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase {

    constructor(page: Page) {
        super(page)
    }

    async formLayoutsPage() {
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Form Layouts').click()
        await this.waitForNumberOfSeconds(2)
    }

    async datePickerPage() {
        await this.selectGroupMenuItem('Forms')
        await this.page.getByText('Datepicker').click()
        await this.waitForNumberOfSeconds(2)

    }

    async smartTablePage() {
        await this.selectGroupMenuItem('Tables & Data')
        await this.page.getByText('Smart Table').click()
        await this.waitForNumberOfSeconds(2)
    }

    async toastrPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Toastr').click()
        await this.waitForNumberOfSeconds(2)
    }

    async tooltipPage() {
        await this.selectGroupMenuItem('Modal & Overlays')
        await this.page.getByText('Tooltip').click()
        await this.waitForNumberOfSeconds(2)
    }

    private async selectGroupMenuItem(groupItemTitle: string) { // Since PW runs so fast, if a thing is not shown it will see it and click on it, this way it can check if its expanded before clicking on it
        const groupMenuItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenuItem.getAttribute('aria-expanded')
        if (expandedState == "false")
            await groupMenuItem.click()
    }
}

