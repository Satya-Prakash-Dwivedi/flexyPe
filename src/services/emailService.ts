import { emailTransporter } from '../config/email';

export const sendAlertEmail = async (ip: string, attempts: number) => {
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: process.env.ALERT_EMAIL,
    subject: 'Alert: Failed Request Threshold Exceeded',
    text: `The IP address ${ip} has exceeded the failed request threshold with ${attempts} attempts.`,
  };

  try {
    await emailTransporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending alert email:', error);
  }
};