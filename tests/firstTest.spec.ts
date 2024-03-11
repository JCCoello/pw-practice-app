import { test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:4200/')
    await page.getByText('Forms').click()
    await page.getByText('Form Layouts').click()
})

test('Locator syntax rules', async ({ page }) => { //In the following example we are trying to pick the email input fiels
    // By tag name
    page.locator('input', {})   //The most common form of finding the loactor is "Locator" in the case the first '' includes the string for the locator and the {} is the options for the locator
    //PW will return all the web elements that heve "input" and the second element narrows dows what it will return
    // By ID
    page.locator('#inputEmail1') //In this case if you want to find the element that has the "id:" you just type #

    // By class value
    page.locator('.shape-rectangle') //In this case, when chosing al enement by class, you first call it by putting a "." in font and then one of the elements that are within the class element in the inspector

    // By attribute
    page.locator('[placeholder="Email"]') // Yo find any element by its attribute you put "[]" and place the element with its value

    // By FULL class value
    page.locator('class="input-full-width size-medium status-basic shape-rectangle nb-transition"') // This is similar to the one above, but this is more complete than usung the dot notation

    // Combine different selectors
    page.locator('input[placeholder="Email"].shape-rectangle') // In this case you can narrow down even more to find exactly what you want to click on

    //By XPath (NOT RECOMMENDED)
    page.locator('//*[@id="inputEmail1"]') //This is using the XPath but is not recommended

    //By partial text match
    page.locator(':text("Using")') //This uses part of the text on the page

    //By exact text match
    page.locator(':text-is("Using the Grid")') //This uses exact text on the page

})