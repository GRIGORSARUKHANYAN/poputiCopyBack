import express from "express";
import multer from "multer";
import AuthController from "../controllers/auth.controller.js";

const router = express.Router();
const authController = new AuthController();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/register", authController.createUser);

router.post("/login", authController.login);


export default router;
