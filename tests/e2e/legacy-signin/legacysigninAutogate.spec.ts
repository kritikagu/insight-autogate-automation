
import { test, expect } from '@playwright/test';
import { getCarsalesAuthCodeEmail } from '../../../helpers/mailosaurHelper';
import testData from '../../../test-data/playwright.stg.data.json';

//Check autogate is giving 200 status code
test('Navigate to stg.autogate.co and verify status 200', async ({ page }) => {
	const response = await page.goto('https://stg.autogate.co');
	expect(response && response.status()).toBe(200);
});

//Check sign in, singup and welcome to Autogate options are available on the page
test('Wait for DOM and check key elements', async ({ page }) => {
	await page.goto('https://stg.autogate.co');

	// Wait for DOM structure to load
	await page.waitForLoadState('domcontentloaded');

	// Check for h1 "Welcome to Augate"
	await expect(page.locator('h1', { hasText: 'Welcome to Autogate' })).toBeVisible();

	// Find button "No subscription? Sign up here!"
	await expect(page.locator('a[href]', { hasText: 'No subscription? Sign up here!' })).toBeVisible();

	// Find button "Sign in"
	await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible();
});

// Positive Scenario - Login with valid credentials, fetch OTP from Mailosaur and verify
test('Login: check name fields, fill, and sign in', async ({ page }) => {

	await page.goto('https://stg.autogate.co');
	await page.getByRole('button', { name: 'No, thanks' }).click();

	// Check for username and password input fields by name
	const usernameInput = page.getByRole('banner').getByPlaceholder('Email');
	const passwordInput = page.getByRole('banner').getByPlaceholder('Password');

	await expect(usernameInput).toBeVisible();
	await expect(passwordInput).toBeVisible();

	// Fill in credentials
	const testEmail = testData.testEmail;
	const testPassword = testData.testPassword;
	await usernameInput.fill(testEmail);
	await passwordInput.fill(testPassword);

	// Wait for DOM structure to load
	await page.waitForLoadState('domcontentloaded');
	await page.waitForTimeout(10000);

	// Click the Sign in button
	const signInButton = page.getByRole('button', { name: 'Sign in' });
	await expect(signInButton).toBeVisible();
	await signInButton.click();
	 // await page.getByRole('button', { name: 'Sign In' }).click();


	// Check for h2 'Two-Factor Authentication'
	await expect(page.locator('h2', { hasText: 'Two-Factor Authentication' })).toBeVisible({ timeout: 10000 });

	// --- Mailosaur: Fetch latest Carsales authentication code email and OTP ---
	const MAILOSAUR_API_KEY = testData.MAILOSAUR_API_KEY;
	const MAILOSAUR_SERVER_ID = testData.MAILOSAUR_SERVER_ID;
	const mailosaurResult = await getCarsalesAuthCodeEmail({
		apiKey: MAILOSAUR_API_KEY,
		serverId: MAILOSAUR_SERVER_ID,
		email: testEmail,
		timeout: 30000
	});

	console.log('Mailosaur email subject:', mailosaurResult.subject);
	console.log('Mailosaur email body:', mailosaurResult.body);
	console.log('Extracted OTP:', mailosaurResult.otp);

	await page.getByLabel('Enter Authentication code:').click();
	await page.getByLabel('Enter Authentication code:').fill(mailosaurResult.otp || '');
	await page.getByRole('button', { name: 'Verify' }).click();

});






