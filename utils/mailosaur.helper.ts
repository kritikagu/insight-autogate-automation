import { APIRequestContext } from "@playwright/test";
import Chance from "chance";
import MailosaurClient from "mailosaur";
import { Message } from "mailosaur/lib/models";
import testData from '../test-data/playwright.stg.data.json';

export class Mailosaur {
  readonly apiReqContext: APIRequestContext;
  readonly mailosaur: MailosaurClient;

  constructor(apiReqContext: APIRequestContext) {
    this.apiReqContext = apiReqContext;
    this.mailosaur = new MailosaurClient(testData.MAILOSAUR_API_KEY as string);
  }

  /** Returns a mailosaur email */
  async createMailosaurEmail(emailSubstring?: string) {
    const chance = new Chance();
    const smallGuid = chance.guid().substring(0, 8);
    if (emailSubstring != null && emailSubstring != undefined) {
      return `${smallGuid}${emailSubstring}`
    } else {
      return `GlobalIdentityQA_${smallGuid}@${testData.MAILOSAUR_SERVER_ID}.mailosaur.net`;
    }
  }
  
  /** Returns a mailosaur email */
  async getEmailByAddress(emailAddress: string, receivedAfter?: Date) {
    const message = await this.mailosaur.messages.get(
      `${testData.MAILOSAUR_SERVER_ID}`,{
        sentTo: emailAddress
      },{
        receivedAfter: receivedAfter ?? new Date(Date.now() - 60 * 60 * 1000) // Use mailosaur defaut 1 hour if not provided
      });
    return message;
  }

  async getOTPFromEmail(message: Message) {
    const subject = message.subject;
    const otp = subject?.match(/\d{6}/)?.[0] ?? '';
    if (!otp) {
      throw new Error('OTP code is missing');
    }
    return otp;
  }
}