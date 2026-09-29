const {test, expect} = require ('@playwright/test')

test('Testing GetByRules options', async({page}) => {

    //To increase the timeout only for this particular test
    test.setTimeout(8000)
    //For test level timeouts, we need to set it up at within the test
    const slowExpect = expect.configure({timeout: 9000})

    page.setDefaultTimeout(6000)

    await page.goto("https://rahulshettyacademy.com/angularpractice/")
    await page.getByLabel("Check me out if you Love IceCreams!").check()
    await page.getByLabel("Student").check()
    await page.getByLabel("Employed").check()
    await page.getByLabel("Gender").selectOption("Female")
    await page.locator("input.form-control[name='name']").fill("Hello")
    await page.locator("input.form-control[name='email']").fill("Hello@gmail.com")
    await page.getByPlaceholder("Password").fill("Password123")
    await page.locator("input.form-control[type='date']").fill('1970-01-22')
    await page.getByRole("button", {name: 'Submit'}).click()
    await page.getByText("Success! The Form has been submitted successfully!. ").isVisible()

    //Custom timeout on assertions on step level
    await expect(page.getByText("Success! The Form has been submitted successfully!.")).toBeVisible({timeout:10_000})
    await page.getByRole("link",{name: 'Shop'}).click()

    await slowExpect(page.locator(".my-4").first()).toHaveText("Shop Name")
    await page.locator("app-card").filter({hasText: "iphone X"}).getByRole("button").click()




})