import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request').click()
})

test('Auto waiting', async ({ page }) => { // First we fing the locator for the success message by inspecting the success message

    const successMessage = page.locator('.bg-success')

    //await successMessage.click()

    //const text = await successMessage.textContent()

    //const text = await successMessage.allTextContents()

    //await successMessage.waitFor({ state: "attached" })
    //const text = await successMessage.allTextContents()

    //expect(text).toContain('Data loaded with AJAX get request.')

    await expect(successMessage).toHaveText('Data loaded with AJAX get request.', { timeout: 20000 })

})

test('Alternative waits', async ({ page }) => {
    const successMessage = page.locator('.bg-success')

    // Wait for element
    //await page.waitForSelector('.bg-success')

    // Wait for a particular response this is found by going into the network and going into the network and looking into the url of the response, "Fetch/XHR" ant the headers and the requested URL
    await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    const text = await successMessage.allTextContents()
    expect(text).toContain('Data loaded with AJAX get request.')

})

test('Timeouts', async ({ page }) => {

    //test.setTimeout(10000)
    const successMessage = page.locator('.bg-success')

    await successMessage.click({ timeout: 16000 }) //This test is wrong bc it has two timeouts, , if you run this test like this it will fail bc the timeout that will lead is the first one that is set up (10000) which is the main one and the one that will run, if you delete that one, it will run the one below which is 16000 and it will pass

})