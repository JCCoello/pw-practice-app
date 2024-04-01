import { Page, expect } from "playwright/test";
import { HelperBase } from "./helperBase";

export class DatePickerPage extends HelperBase {


    constructor(page: Page) {
        super(page)
    }

    async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
        const calendarInputField = this.page.locator('[placeholder="Form Picker"]');
        await calendarInputField.click();
        const dateToAssert = await this.selectDateInTheCalendar(numberOfDaysFromToday)
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }

    async selectDatePickerFromTodayWithRange(StartDayFromToday: number, endDayFromToday: number) {
        const calendarInputField = this.page.getByPlaceholder('Range Picker')
        await calendarInputField.click()
        const dateToAssertStart = await this.selectDateInTheCalendar(StartDayFromToday)
        const dateToAssertEnd = await this.selectDateInTheCalendar(endDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`
        await expect(calendarInputField).toHaveValue(dateToAssert)
    }


    private async selectDateInTheCalendar(numberOfDaysFromToday: number) {

        let date = new Date();
        date.setDate(date.getDate() + numberOfDaysFromToday);
        const expectedDate = date.getDate().toString();
        const expectedMonthShort = date.toLocaleString('en-US', { month: 'short' });
        const expectedMonthLong = date.toLocaleString('en-US', { month: 'long' });
        const expectedYear = date.getFullYear();
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        const expectedMonthAndYear = `${expectedMonthLong} ${expectedYear}`;
        while (!calendarMonthAndYear.includes(expectedMonthAndYear)) { // This is the while loop
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click();
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent();
        }

        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, { exact: true }).nth(1).click();
        return dateToAssert
    }
}