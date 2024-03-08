import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test.describe('suite1', () => {
    test.beforeEach(async ({ page }) => { //these are hooks that only run for the tests in this suite
        await page.getByText('Forms').click()
    })

    test('the first test', async ({ page }) => {
        await page.getByText('Form Layouts').click()
    })

    test('navigate to datepicker page', async ({ page }) => {
        await page.getByText('Datepicker').click()
    })

})

test.describe.only('suite1', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Auth').click()
    })

    test('the first test1', async ({ page }) => {
        await page.getByText('Login').click()
    })

    test('navigate to datepicker page1', async ({ page }) => {
        await page.getByText('Modal & Overlays').click()
    })

})