import { test, expect } from '@playwright/test'
import { PageManager } from '../page-objects/pageManager'


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test('Navigate to form page', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.navigateTo().datePickerPage()
    await pm.navigateTo().smartTablePage()
    await pm.navigateTo().toastrPage()
    await pm.navigateTo().tooltipPage()
})

test('Parameterized methods', async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption('test@test.comex', 'Welcome', 'Option 2')
    //If we want to fill the table with different arguments just change them in the test
    await pm.onFormLayoutPage().submitInlineFormFormWithNameEmailAndCheckbox('Ana Coelby', 'ana@baby.com', true)
    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(0)
    await pm.onDatePickerPage().selectDatePickerFromTodayWithRange(0, 1)
})