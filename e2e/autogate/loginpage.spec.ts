

/*import { test, expect } from '@playwright/test';
const Mailosaur = require('mailosaur');


const MAILOSAUR_API_KEY = 'TKVt4gWdKKM3Zbha5ndRGizFYkMIXvtw'; // Replace with your Mailosaur API key
const MAILOSAUR_SERVER_ID = 'y3kbv132';
const TEST_EMAIL = 'production-include@y3kbv132.mailosaur.net';
const TEST_PASSWORD = 'Test@987654';

test('Login with OTP and show dashboard, close cookie consent', async ({ page }) => {
	// Navigate to dashboard
	await page.goto('https://stg.autogate.co/dashboard');

	// Find the login form by heading or form text
	const loginForm = page.locator('form:has-text("Sign in to AutoGate")');
	await expect(loginForm).toBeVisible();

	// Fill email and password fields inside the login form
	await loginForm.locator('input[placeholder="Email"]').fill(TEST_EMAIL);
	await loginForm.locator('input[placeholder="Password"]').fill(TEST_PASSWORD);

	// Click sign in button inside the form
	await loginForm.locator('button:has-text("Sign In")').isVisible({ timeout: 10000 });
	await loginForm.locator('button:has-text("Sign In")').click();
	

	 // Check that dashboard H1 is visible

	 
	 await expect(page.locator('h2', { hasText: 'Two-Factor Authentication' })).toBeVisible({ timeout: 10000 });
 // await expect(page.locator('h1', { hasText: 'Dashboard' })).toBeVisible({ timeout: 10000 });
	
	//await expect(page.locator('h6', { hasText: 'testuser KRitika' })).toBeVisible({ timeout: 10000 });
	*/

/*
	// Wait for "Two-Factor Authentication" pop up to appear
	await expect(page.locator('text=Two-Factor Authentication')).toBeVisible({ timeout: 15000 });
	/*
	// Wait for OTP input to appear
	const otpInput = page.locator('input[placeholder*="OTP"]');
	await expect(otpInput).toBeVisible({ timeout: 15000 });

	// Fetch OTP from Mailosaur
	const mailosaur = new Mailosaur(MAILOSAUR_API_KEY);
	const email = await mailosaur.messages.get(MAILOSAUR_SERVER_ID, {
		sentTo: TEST_EMAIL
	});
	// Extract OTP from email body (adjust regex as needed)
	const otpMatch = email.text.body.match(/\b\d{4,6}\b/);
	const otp = otpMatch ? otpMatch[0] : '';

	// Enter OTP
	await otpInput.fill(otp);
	await page.click('button:has-text("Verify")');

	// Wait for navigation after OTP
	await page.waitForLoadState('networkidle');

	// Print the page title to show the page that appears
	const title = await page.title();
	console.log('Page title after login:', title);

	// Close cookie consent banner if present
	const cookieBanner = page.locator('text=Accept All');
	if (await cookieBanner.isVisible({ timeout: 5000 })) {
		await cookieBanner.click();
	}
 	*/
//});


