import { Router } from "express";
// import FilesController from "../controllers/file.controller.js";
// import authMiddleware from "../middlewares/auth.middleware";


class FilesRoute {
  constructor() {
    this.router = Router();
    this.filesController = new FilesController();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/:id", this.filesController.getFileById);
  }
}

module.exports = new FilesRoute().router;


