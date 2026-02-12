import { test, expect } from "../../../utils/fixture";
import testData from '../../../test-data/playwright.stg.data.json';

test.describe('Universal Login passwordless login', () => {

  const homePageUrl = `${testData.AutogateUrlGI}`;
  const existingEmail = `${testData.testEmail}`;
  const existingFirstName = `${testData.testFirstName}`;


  const invalidOtp = '111111';
  const invalidEmail = '@a1zrven1.mailosaur.net';
  const resendCodeTimeout = 3000;
 
  test.beforeEach(async ({ page }) => { 
    await page.goto(homePageUrl);
    await page.waitForTimeout(resendCodeTimeout);
    await page.getByRole('button', { name: 'No, thanks' }).click();
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.waitForURL('**/ui/login/**'); // Wait for login page to load
  });

   //1. Successful Sign-In using email and a one-time code
   test('User login success', async ({ page, mailosaurFixture, commonFixture }) => {    
    await commonFixture.fillEmailAndProceed(page, existingEmail);

    // Get otp from email
    const message = await mailosaurFixture.getEmailByAddress(existingEmail, new Date(Date.now() - 10000));
    const otp = await mailosaurFixture.getOTPFromEmail(message);

    // Wait for the OTP input field to appear and proceed
    await commonFixture.fillOTP(page, otp);
    await page.getByRole('button', { name: 'Confirm' }).click();

    // Wait for successful login indication (e.g., redirect to dashboard)
    const truncatedFirstName = existingFirstName.substring(0, 6) + '...';
    await page.waitForSelector(`button:has-text("${truncatedFirstName}")`);
    await expect(page.locator(`button:has-text("${truncatedFirstName}")`)).toBeVisible();
  });
    
  //2. Attempt to sign in with an invalid email format 
  test('User login invalid email', async ({ page, commonFixture }) => {
    await commonFixture.fillEmailAndProceed(page, invalidEmail);
    await expect(page.locator('text=Please enter a valid email address')).toBeVisible();
  });

    //3. Attempt to sign in with an empty email field
    test('User login empty email', async ({ page }) => {
    let nextButton = page.getByRole('button', { name: 'Next', exact: true });
    await nextButton.click();
    await expect(page.locator('text=Email required.')).toBeVisible();
  });

  //4. Attempt to verify with an incorrect code
  test('User login incorrect code', async ({ page, commonFixture }) => {
    await commonFixture.fillEmailAndProceed(page, existingEmail);

    // Wait for the OTP input field to appear
    await commonFixture.fillOTP(page, invalidOtp);
    await page.getByRole('button', { name: 'Confirm' }).click();

    // Check for error message
    await expect(page.locator('text=Code is incorrect. Try again.')).toBeVisible();
  });

  // --- 5. Test commented out due to the OTP code expiration time being >5 minutes which is too long for the test ---
  // test('User login expired otp code', async ({ page, mailosaurFixture, commonFixture }) => {
  //   await commonFixture.fillEmailAndProceed({ page, newEmail });

  //   // Get otp from email
  //   const message = await mailosaurFixture.getEmailByAddress(newEmail);
  //   const otp = await mailosaurFixture.getOTPFromEmail(message);

  //   // Wait until OTP code is expired
  //   await page.waitForTimeout(40000); // Wait for 40 seconds

  //   // Enter the OTP code and proceed
  //   await commonFixture.fillOTP(page, otp);

  //   // Check for error message
  //   const invalidCodeErrorLocator = page.locator('text=Invalid code');
  //   expect(invalidCodeErrorLocator).toBeVisible();
  // });


  test('6. User login and cancel', async ({ page, commonFixture, mailosaurFixture }) => {
    test.slow();
    await commonFixture.fillEmailAndProceed(page, existingEmail);

    // Go back to the previous page
    const backButton = page.getByRole('button', { name: 'Back' });
    await backButton.waitFor();
    await backButton.click();
    await page.waitForURL('/ui/login/**'); // Wait for login page to load
    await page.waitForTimeout(1000);

    // Try to login
    await commonFixture.fillEmailAndProceed(page, existingEmail);

    // Should be on the sign up page again
    await expect(page.locator('text=Login without a password')).toBeVisible();

    // Proceed to login
    const message = await mailosaurFixture.getEmailByAddress(existingEmail, new Date(Date.now() - 10000));
    const otp = await mailosaurFixture.getOTPFromEmail(message);
    await commonFixture.fillOTP(page, otp);
    await page.getByRole('button', { name: 'Confirm' }).click();

    // Wait for successful login indication (e.g., redirect to dashboard)
    const truncatedFirstName = existingFirstName.substring(0, 6) + '...';
    await page.waitForSelector(`button:has-text("${truncatedFirstName}")`);
    await expect(page.locator(`button:has-text("${truncatedFirstName}")`)).toBeVisible();

  });



});