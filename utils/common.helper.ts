import { Page } from "@playwright/test";
import { expect } from "../utils/fixture";

export class Common {
  constructor(public readonly page: Page) {}

  async fillEmailAndProceed(page: Page, email: string) {
    let emailTextbox = page.getByRole('textbox', { name: 'email' });
    await emailTextbox.waitFor();
    await emailTextbox.fill(`${email}`);

    await page.getByRole('button', { name: 'Next' }).click();
  }

  async fillOTP(page: Page, otp: string) {
    const otpTextboxes = page.locator('input[id^="pinCode-digit-"]');
    await otpTextboxes.first().waitFor();
    await expect(otpTextboxes).toHaveCount(6);

    for (let i = 0; i < otp.length; i++) {
      await otpTextboxes.nth(i).fill(otp[i]);
    }
  }
}