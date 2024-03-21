import { test, expect } from '@playwright/test'
import { tooltip } from 'leaflet'
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
    await page.getByText('Modal & Overlays').click()
    await page.getByText('Toastr').click()

    await page.getByRole('checkbox', { name: "Hide on click" }).click({ force: true }) // We need to proviide this as it will not work bc it its visually hidden
    // The command "click" actually clicks on the element, it turns it on or off, if you use the .check command, 
    //it will only provide a check, iif its not checked it will check it and if its checked it will do nothing, otherwise u can use "uncheck"
    await page.getByRole('checkbox', { name: "Prevent arising of duplicate toast" }).click({ force: true })
    await page.getByRole('checkbox', { name: "Show toast with icon" }).click({ force: true })

    const allBoxes = page.getByRole('checkbox')
    for (const box of await allBoxes.all()) { // This will create an array of all the checkboxes
        await box.check({ force: true })
        expect(await box.isChecked()).toBeTruthy()

    }
})

test('Lists & Dropdowns', async ({ page }) => {
    // This one's gonna ba tricky as it is not real easy to select the list it is clicking on the button at the top of the page and changing tones of the page
    const dropDownMenu = page.locator('ngx-header nb-select')
    await dropDownMenu.click()

    page.getByRole('list') // When the list has a UL tag
    page.getByRole('listitem') // When the list has a IL tag

    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])

    await optionList.filter({ hasText: "Cosmic" }).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb (255, 255, 255)",
        "Dark": "rgb (34, 43, 69)",
        "Cosmic": "rgb (50, 50, 89)",
        "Corporate": "rgb (255, 255, 255)"

    }

    await dropDownMenu.click()
    for (const color in colors) {
        await optionList.filter({ hasText: color }).click()
        if (color != "Corporate")
            await dropDownMenu.click()

    }

})


test('Tooltips', async ({ page }) => {

    await page.getByText('Modal & Overlays').click()
    await page.getByText('Tooltip').click()

    const toolTipCard = page.locator('nb-card', { hasText: "Tooltip Placements" })
    await toolTipCard.getByRole('button', { name: "Top" }).hover()

    page.getByRole('tooltip')
    const tooltip = await page.locator('nb-tooltip').textContent()
    expect(tooltip).toEqual('This is a tooltip')
})

test('Dialog Box', async ({ page }) => {   // This would be a modal from the browser, not a web pop up, we want to click on the trash icon on the first row, we have to drill down to the trash icon form the row

    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    page.on('dialog', dialog => { // This code will accept the browser pop up, this is the listener
        expect(dialog.message()).toEqual('Are you sure you want to delete?')
        dialog.accept()

    })

    await page.getByRole('table').locator('tr', { hasText: "mdo@gmail.com" }).locator('.nb-trash').click() // By default, PW will close the dialog box, so the cose above will accept it
    await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com') // This checks if the element was in fact deleted
})

test.only('Web tables', async ({ page }) => {  // In this case we took a row from the table and modified the age
    await page.getByText('Tables & Data').click()
    await page.getByText('Smart Table').click()

    // Get the row by any text
    const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' })
    await targetRow.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('Age').clear()
    await page.locator('input-editor').getByPlaceholder('Age').fill('35')
    await page.locator('.nb-checkmark').click()

    // Get the row based on the text in a specific column
    await page.locator('.ng2-smart-pagination-nav').getByText('2').click()
    const targetRowByID = page.getByRole('row', { name: "11" }).filter({ has: page.locator('td').nth(1).getByText('11') })
    await targetRowByID.locator('.nb-edit').click()
    await page.locator('input-editor').getByPlaceholder('E-mail').clear()
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@coello.comex')
    await page.locator('.nb-checkmark').click()
    await expect(targetRowByID.locator('td').nth(5)).toHaveText('test@coello.comex')

    // Test filter for the table
    const ages = ["20", "30", "40", "200"]
    for (let age of ages) {
        await page.locator('input-filter').getByPlaceholder('Age').clear()
        await page.locator('input-filter').getByPlaceholder('Age').fill(age)
        await page.waitForTimeout(500)
        const ageRows = page.locator('tbody tr')

        for (let row of await ageRows.all()) {
            const cellValue = await row.locator('td').last().textContent()

            if (age == "200") {
                expect(await page.getByRole('table').textContent()).toContain('No data found')
            } else {
                expect(cellValue).toEqual(age)
            }

        }
    }

})