import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

// router.get("/api/auth/me");
router.post("/profile", authController.registerUser);
// router.post("/api/auth/profile/");

export default router;
