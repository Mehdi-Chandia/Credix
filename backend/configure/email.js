import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendResetPasswordEmail = async (email, resetLink, userName) => {
    try {
        await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: email,
            subject: 'Reset Your Password',
            html: `<a href="${resetLink}">Click here to reset your password</a>`,
        });
        console.log(" Email sent to:", email);
        return true;
    } catch (error) {
        console.log(" Error:", error.message);
        return false;
    }
};