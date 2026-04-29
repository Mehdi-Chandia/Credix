import crypto from "crypto";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {sendResetPasswordEmail} from "../configure/email.js";

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        console.log("email", email);

        // 1. find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({ message: "If account exists, email sent" });
        }
      console.log(user)
        // 2. generate raw token
        const rawToken = crypto.randomBytes(32).toString("hex");

        // 3. hash token
        const hashedToken = crypto
            .createHash("sha256")
            .update(rawToken)
            .digest("hex");

        console.log(hashedToken);

        // 4. save in DB
        user.resetPasswordToken = hashedToken;
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000; // 15 min

        await user.save();

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${rawToken}`;

        await sendResetPasswordEmail(email, resetLink, user.name)

        console.log(resetLink);

        console.log("RAW TOKEN:", rawToken); // simulate email

        return res.json({ message: "Reset link sent",resetLink });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};



export const verifyResetToken = async (req, res) => {
    try {
        const { token } = req.params;

        console.log("verifying",token);

        // 1. hash the incoming token (because DB stores hashed version)
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // 2. find user with this token AND token not expired
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() } // token still valid
        });

        // 3. if no user found → token invalid or expired
        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset token"
            });
        }

        console.log(user)

        // 4. token is valid ✅
        return res.json({
            message: "Token is valid",
            email: user.email // optional: send email back
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};



export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        // 1. validate password
        if (!password || password.length < 6) {
            return res.status(400).json({
                message: "Password must be at least 6 characters"
            });
        }

        // 2. hash the incoming token
        const hashedToken = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        // 3. find user with this token AND token not expired
        const user = await User.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        // 4. if no user found → token invalid or expired
        if (!user) {
            return res.status(400).json({
                message: "Invalid or expired reset token"
            });
        }

        // 5. hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 6. update user password
        user.password = hashedPassword;
        user.resetPasswordToken = undefined; // clear the token
        user.resetPasswordExpires = undefined; // clear the expiry

        await user.save();

        // 7. send success response
        return res.json({
            message: "Password reset successfully! You can now login."
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
};