import { test, expect } from '@playwright/test'
import { EmptyError } from 'rxjs'


test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('User facing Locators', async ({ page }) => {
    await page.getByRole('textbox', { name: "Email" }).first().click() //In this case it is pointing to the  textbox that has the name "Email" but there are two elements with the same name so we make it click on the .first element
    await page.getByRole('button', { name: "Sign in" }).first().click() //This does the same for the Sign in button

    await page.getByLabel('Email').first().click() //This is another way of getting the emelent by label

    await page.getByPlaceholder('Jane Doe').click()

    await page.getByText('Using the Grid').click()

    await page.getByTestId('signIn').click()    //In this case the tag is something that the user cant see but it makes for better test, to search for this ID, you have to search within
    //the source code by searching in VS, in this case you click on the magnifiyng glass and search for "Sign in"
    //then you add in the source code at the sign in button after the "<button" add "data-testid="signIn"" befire the "type"

    await page.getByTitle('IoT Dashboard').click()
})

test('locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click() //You can run it like this (Side by side) or chaining the things (like below)
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

    await page.locator('nb-card').getByRole('button', { name: "Sign in" }).first().click() //This is another way of clicking on the Sign in button, in this case "nb-card" is not needed, just for your reference, bc we clickedd on it earlier without using it

    await page.locator('nb-card').nth(5).getByRole('button').click() //This method is not a preffered way of getting the element, it gets the 6th element that has the "button" role  (The 2nd sign in button). Use this method as a last result
})

test('locating parent elements', async ({ page }) => {
    // Here we are gonna locate a particular Email text box as there are many Email forms, this will be done by the text in the title that the box contains
    //  If we want to tocate the email field within the box "Using the grid" we do it this way:
    // We inspect the website and get the parent of the "np-card-header" thet has the text "Using the Grid"

    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: "Email" }).click()
    // In this case only one element will be returned, differing what was returned in the previous lesson and then find the textbox that contains "email" as TEXT

    await page.locator('nb-card', { has: page.locator('#inputPassword2') }).getByRole('textbox', { name: "Password" }).click()
    // In this case we nestled a locator within the parent element and we click on the pw field within the "Using the Grid" element

    await page.locator('nb-card').filter({ hasText: "Basic Form" }).getByRole('textbox', { name: "Email" }).click()
    // In this case we are filtering within the nb-card within the card "Basic Form"

    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('textbox', { name: "Password" }).click()
    // In this case we are identifying the card to click on the element by the color of the button

    await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).filter({ hasText: "Sign in" }).getByRole('textbox', { name: "Email" }).click()
    // Here we are finding the email element by filtering the elements that have a "Checkbox" and a "Sign in" button

    await page.locator(':text-is("Using the Grid').locator('..').getByRole('textbox', { name: "Email" }).click()
    // The ".." notation brings a level up to the element. This apparently is the XPath method

})

test('Reusing the locators', async ({ page }) => { // Here we are gonna automate a login and the refactor to use less code
    //await page.locator('nb-card').filter({ hasText: "Basic Form" }).getByRole('textbox', { name: "Email" }).fill('juan@test.com')
    //await page.locator('nb-card').filter({ hasText: "Basic Form" }).getByRole('textbox', { name: "Password" }).fill('AssworDXX123?¡')
    //await page.locator('nb-card').filter({ hasText: "Basic Form" }).getByRole('button').click()
    //Now we rewrite the code to simplify by putting duplicated code into a "const" like thsi:


    const basicForm = page.locator('nb-card').filter({ hasText: "Basic Form" })
    const emailField = basicForm.getByRole('textbox', { name: "Email" }) // Note that in this case we used a const inside a const in order to print the email, making it much shorter

    await emailField.fill('juan@test.com')
    await basicForm.getByRole('textbox', { name: "Password" }).fill('AssworDXX123?¡')
    await basicForm.locator('nb-checkbox').click()
    await basicForm.getByRole('button').click()

    await expect(emailField).toHaveValue('juan@test.com')
    // Here we wrote our first assertion, be aware that we inported the "expect" thing at the beggining of the test

})

test('Extracting valus', async ({ page }) => { // Here we want to validate that the "submit" button has the text "submit" on the "Basic Form" element
    // Single text value
    const basicForm = page.locator('nb-card').filter({ hasText: "Basic Form" })
    const buttonText = await basicForm.locator('button').textContent()
    expect(buttonText).toEqual('Submit')

    // All text values
    // Here we are gonna take the radio button under "Using the Grid" and verify at least one radio button has the value of "Option 1"
    const allRadioButtonLabels = await page.locator('nb-radio').allTextContents()
    expect(allRadioButtonLabels).toContain("Option 1")

    // Input value 
    const emailField = basicForm.getByRole('textbox', { name: "Email" })
    await emailField.fill('test@test.com')
    const emailValue = await emailField.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderVaule = await emailField.getAttribute('placeholder')
    expect(placeholderVaule).toEqual('Email')
})

test('Assertions', async ({ page }) => {

    const basicFormButton = page.locator('nb-card').filter({ hasText: "Basic Form" }).locator('button')

    //General assertions
    const value = 5
    expect(value).toEqual(5) // In this very simple example, on the left you chose the element to find and on the right the value of this element (Exact value), if you notice in this assertion there is no wait

    //Locator assertion
    const text = await basicFormButton.textContent()
    expect(text).toEqual("Submit")

    await expect(basicFormButton).toHaveText('Submit') //BTW when you put an "await" before, it will wait until 5 seconds before it gives up, different to the General assertions which will not wait

    // Soft assertion
    await expect.soft(basicFormButton).toHaveText('SubmitXXX')
    await basicFormButton.click()

})
