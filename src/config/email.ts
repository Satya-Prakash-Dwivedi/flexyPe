import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const emailTransporter = nodemailer.createTransport({
  host : 'smtp.gmail.com',
  service: 'gmail',
  port : 465,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});