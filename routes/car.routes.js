import express from "express";
import multer from "multer";
import CarController from "../controllers/car.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const carController = new CarController();
const upload = multer({ storage: multer.memoryStorage() });


router.get("/:id",authMiddleware, carController.getCarById);
router.get("carByUserId/:id",authMiddleware, carController.getCarByUserId);

router.post(
  "/",
  authMiddleware,
  carController.createCar
);
router.delete("/:id",authMiddleware, carController.deleteCar);



export default router;
