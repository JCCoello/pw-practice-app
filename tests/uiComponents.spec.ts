import { test, expect } from '@playwright/test'
import { using } from 'rxjs'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
})

test.describe('Form layouts page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click()
        await page.getByText('Form Layouts').click()
    })

    test('input fields', async ({ page }) => {
        const usingTheGridEmailInput = page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" })

        await usingTheGridEmailInput.fill('ana@coello.com')
        await usingTheGridEmailInput.clear() // This will clear the input filled, you have to call the 
        await usingTheGridEmailInput.pressSequentially('ana2@coello.com') //This fills it not so quickly
        await usingTheGridEmailInput.clear()
        await usingTheGridEmailInput.pressSequentially('anaSlow@coe.co', { delay: 500 }) // This will be even slower, waiting half a second between keystrokes

        // Generic Assertion
        const inputValue = await usingTheGridEmailInput.inputValue()
        expect(inputValue).toEqual('anaSlow@coe.co')

        //Locator assertion
        await expect(usingTheGridEmailInput).toHaveValue('anaSlow@coe.co')
    })

    test('Radio Buttons', async ({ page }) => {
        const usingTheGridEForm = page.locator('nb-card', { hasText: "Using the Grid" })

        //await usingTheGridEForm.getByLabel('Option 1').check({ force: true }) //Since the element is set as "not visible" you set it as "force: true" so it can be seen by the test
        await usingTheGridEForm.getByRole('radio', { name: "Option 1" }).check({ force: true }) // This is another way of writong the same code

        //Generic assertion
        const radioStatus = await usingTheGridEForm.getByRole('radio', { name: "Option 1" }).isChecked()
        expect(radioStatus).toBeTruthy()

        //Locator assertion
        await expect(usingTheGridEForm.getByRole('radio', { name: "Option 1" })).toBeChecked()


        await usingTheGridEForm.getByRole('radio', { name: "Option 2" }).check({ force: true }) // In this case we are checking that the option 2 button is checked and the Option 1 button is not
        expect(await usingTheGridEForm.getByRole('radio', { name: "Option 1" }).isChecked()).toBeFalsy() // Falsy and truthy are to check if selected or not selected
        expect(await usingTheGridEForm.getByRole('radio', { name: "Option 2" }).isChecked()).toBeTruthy()
    })

})

test('Checkboxes', async ({ page }) => { //This is created outside the describe test as it is going into a new page

})
