import express from "express";
import multer from "multer";
import UserController from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const userController = new UserController();
const upload = multer({ storage: multer.memoryStorage() });


router.get("/:id", userController.getUserById);
router.post(
  "/personalInformation",
  authMiddleware,
  upload.fields([
    { name: "pasportImage", maxCount: 1 },
    { name: "driversLicenseImage",maxCount: 1},
  ]),
  userController.personalInformation
);

router.post(
    "/udateProfilePhoto",
    authMiddleware,
    upload.fields([
        { name: "profilePhoto",maxCount: 1},
      ]),
    userController.udateProfilePhoto
  );

export default router;
