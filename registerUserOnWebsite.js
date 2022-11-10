const playwright = require("playwright")
const writeToExcel = require("./writeToExcel.js")

const URL = "https://studio.code.org/users/sign_in"
const main = async (dataObject) => {
    const arrayOfObjectsOutput = new Array()
    const browser = await playwright["chromium"].launch({ headless: false, });
    let index = 0
    for (object of dataObject) {
        index+=1
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(URL);
        await page.waitForLoadState(`load`);

        const signInBtn = await page.$(`[class="blue-button"]`)
        await signInBtn.click()
    
        await page.waitForLoadState("load");
        const emailInput = await page.$(`[id="user_email"]`)
        await emailInput.type(object.gmail)
    
        const passwordInput = await page.$(`[id="user_password"]`)
        await passwordInput.type(object.password)
    
        const passwordConfirmationInput = await page.$(`[id="user_password_confirmation"]`)
        await passwordConfirmationInput.type(object.password)
        
        const submitBtn = await page.$("[class='submit']")
        submitBtn.click()

        await page.waitForLoadState(`load`);
        await page.waitForTimeout(3000);
        const accountStudentType = await page.$("[class='select-user-type-student-button']")
        await accountStudentType.click()

        const userName = await page.$("[id='user_name']")
        userName.type(object.name)

        const age = await page.$("[id='user_age']")
        age?.selectOption(object.age)

        const finalSubmitBtn = await page.$("[class='submit']")
        finalSubmitBtn.click()
        await page.waitForLoadState(`load`);
        await page.waitForTimeout(3000);
        arrayOfObjectsOutput.push([
            {
                type: String,
                value: object.gmail
            },
            {
                type: String,
                value: object.password
            }
        ])
        await page.screenshot({ path: `images/screenshot-${index}.png`, fullPage: true })
        await page.close()
    }
    await writeToExcel(arrayOfObjectsOutput)
}

module.exports = main

// TODO: Divide the excel into 2 parts and run (time reduces and efficiency increases)
// TODO: Instead Of creating a new chromium browser every time just go to another url