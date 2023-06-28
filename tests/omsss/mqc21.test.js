const { Builder, By, until, WebElement } = require('selenium-webdriver')
const { loginToStudent } = require('../../home/login')
const firefoxOptions = require('../../helpers/firefoxOptions')

describe('MQC-21: Medical Consultation Page', () => {
    let driver

    beforeAll(async () => {
        driver = new Builder().forBrowser('firefox').setFirefoxOptions(firefoxOptions).build()
    })

    afterAll(async () => {
        await driver.quit()
    })

    test('Should be able to Login to Student Dashboard', async () => {
        await loginToStudent(driver)

        // Check if the login was successful by looking for an element that should be present after logging in
        const loggedInElementXPath = '/html/body/div/div[3]/div/div/div[1]/div/div'
        const loggedInElement = await driver.wait(
            until.elementLocated(By.xpath(loggedInElementXPath)),
            5000
        )

        expect(loggedInElement).toBeDefined()
        await driver.sleep(5000)
    }, 30000)

    test('Should load the appointment tab after clicking and see sub tabs of "Medical Consultation", Dental Consultation", and "Guidance Consultation".', async () => {
        await driver.sleep(5000)

        const appointmentSidebarXPath ='//*[@id="navbar-nav"]/div[1]/div[2]/div/div/div/li[17]/a'  

        await driver.findElement(By.xpath(appointmentSidebarXPath)).click()
        
        await driver.sleep(5000)
    }, 30000)

    test('Should be able to load the Medical Consultation Page after clicking', async () => {
        await driver.sleep(5000)

        const medicalConsultationPageXPath =
            '//*[@id="sidebarAppointment"]/ul/li[1]/a'

        await driver.findElement(By.xpath(medicalConsultationPageXPath)).click()

        await driver.sleep(5000)
    }, 30000)

    test('Should be able to fill out the form about consultation type, reason for consultation, and appointment date for New Appointment', async () => {
        await driver.sleep(5000)
        
        const radioButtonXPath = '//*[@id="consultation_type"]'
        const radioButton = await driver.findElement(By.xpath(radioButtonXPath))
        await radioButton.click();

        const consultationReason = 'Allergic Rhinitis'
        const consultationReasonXPath = '//*[@id="consultation_reason"]'
        await driver.findElement(By.xpath(consultationReasonXPath)).sendKeys(consultationReason)
        
        const dateInputXPath = '//*[@id="medical-calendar"]/div[2]/div/div[2]/div[34]'
        // Click the date input field to open the calendar
        const dateInput = await driver.findElement(By.xpath(dateInputXPath));
        await dateInput.click();

        // Locate and click the desired date in the calendar
        const desiredDateXPath = '//*[@id="medical-calendar"]/div[2]/div/div[2]/div[34]/button'; // Replace with the XPath of the desired date in the calendar
        const desiredDate = await driver.findElement(By.xpath(desiredDateXPath));
        await desiredDate.click();

        await driver.sleep(5000)
    }, 30000) 

    test('Should be able to successfully log out of the system', async () => {
        const loginUrl = 'http://localhost/myPUPQC/signin'

        console.log(await driver.getCurrentUrl())

        expect(await driver.getCurrentUrl()).toBe(loginUrl)
    })
    
})
