class LoginPage {

    constructor(page) {

        this.page = page;
        this.userName = page.locator('#userEmail')
        this.password = page.locator('#userPassword')
        this.logIn = page.locator('[type="submit"]')
    }
    async goTo(){

       await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login", {
           waitUntil: 'domcontentloaded'
       })
    }

    async validLogin(userName, password) {

        await this.userName.fill(userName)
        await this.password.fill(password)
        await this.logIn.click()
        await this.page.locator('.card-body').first().waitFor()
    }

}

module.exports = { LoginPage }