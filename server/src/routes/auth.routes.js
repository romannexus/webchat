import express from "express";
import authController from "../controllers/auth.controller.js";

const router = express.Router();

// router.get("/api/auth/me");
router.post("/profile", authController.registerUser);
router.post("/profile/session", authController.login);
router.delete("/profile/deleteSession", authController.deleteUser);
router.get("/profile/session/all", authController.findAll);
router.get("/profile/session/isActive", authController.isActive);
router.post("/profile/session/logOut", authController.logOut);

export default router;
