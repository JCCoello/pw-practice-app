import { test, expect } from '@playwright/test'
import { NavigationPage } from '../page-objects/navigationPage'
import { timeout } from 'rxjs/operators'
import { FormLayoutsPage } from '../page-objects/formLayoutsPage'
import { DatePickerPage } from '../page-objects/datePickerPage'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to form page', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.formLayoutsPage()
    await navigateTo.datePickerPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()

})

test('Parameterized methods', async ({ page }) => {
    const navigateTo = new NavigationPage(page)
    const onFormLayoutsPage = new FormLayoutsPage(page)
    const onDatePickerPage = new DatePickerPage(page)

    await navigateTo.formLayoutsPage()
    await onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.comex', 'Welcome', 'Option 2')
    //If we want to fill the table with different arguments just change them in the test
    await onFormLayoutsPage.submitInlineFormFormWithNameEmailAndCheckbox('Ana Coelby', 'ana@baby.com', true)
    await page.waitForTimeout(1000)
    await navigateTo.datePickerPage()
    await onDatePickerPage.selectCommonDatePickerDateFromToday(0)
    await page.waitForTimeout(1000)
    await onDatePickerPage.selectDatePickerFromTodayWithRange(0, 2)
})