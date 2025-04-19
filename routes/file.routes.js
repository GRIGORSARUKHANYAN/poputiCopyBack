// import { Router } from "express";
// // import FilesController from "../controllers/file.controller.js";
// // import authMiddleware from "../middlewares/auth.middleware";


// class FilesRoute {
//   constructor() {
//     this.router = Router();
//     this.filesController = new FilesController();
//     this.initializeRoutes();
//   }

//   initializeRoutes() {
//     this.router.get("/:id", this.filesController.getFileById);
//   }
// }

// module.exports = new FilesRoute().router;







import express from "express";
import FileController from "../controllers/file.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();
const fileController = new FileController();


router.get("/:id", fileController.getFileById);
router.delete("/:id", fileController.deleteFile);



export default router;
