import express from "express";
import {fetchProfile, login, logout, register} from "../controllers/user.controller.js";
import {forgotPassword, resetPassword, verifyResetToken} from "../controllers/forgotPassword.controller.js";
import {verifyToken} from "../middleware/auth.js";
const router=express.Router();

router.post("/register",register)
router.post("/login",login)
router.get("/logout",logout)
router.post("/forgot-Password",forgotPassword)
router.get("/verify-reset-token/:token",verifyResetToken)
router.post("/reset-password/:token",resetPassword)
router.get("/auth/me",verifyToken,fetchProfile)

export default router;