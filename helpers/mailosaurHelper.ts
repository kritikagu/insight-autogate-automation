import MailosaurClient from 'mailosaur';

export async function getCarsalesAuthCodeEmail({
  apiKey,
  serverId,
  email,
  timeout = 30000
}: {
  apiKey: string;
  serverId: string;
  email: string;
  timeout?: number;
}) {
  const mailosaur = new MailosaurClient(apiKey);
  const message = await mailosaur.messages.get(serverId, {
    sentTo: email,
    subject: 'Carsales authentication code'
  }, { timeout });

  if (!message || !message.subject || !message.subject.includes('Carsales authentication code')) {
    throw new Error('No Carsales authentication code email found');
  }

  // Extract OTP from HTML body
  const rawHtml = message.html?.body || '';
  const plainText = rawHtml.replace(/<[^>]+>/g, ' ');
  const otpMatch = plainText.match(/\b\d{6}\b/);

  return {
    subject: message.subject,
    body: message.text?.body,
    otp: otpMatch ? otpMatch[0] : null
  };
}
