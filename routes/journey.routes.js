import express from "express";
import multer from "multer";
import JourneyController from "../controllers/journey.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const journeyController = new JourneyController();

router.get("/",authMiddleware, journeyController.getJourneys);
router.get("/:id",authMiddleware, journeyController.getJourneyById);


router.put("/joinJourney/:id",authMiddleware, journeyController.joinJourney);

router.post("/",authMiddleware, journeyController.createJourney);




router.delete("/:id",authMiddleware, journeyController.deleteJourney);



export default router;
