import FileService from "../services/file.service.js"; // Ավելացրու `.js`

class FilesController {
  constructor() {
    this.fileService = new FileService();
  }

  createFile = async (req, res, next) => {
    try {
      let fileData = {};
      if (req.file) {
        fileData = {
          fileName: req.file.originalname,
          buffer: req.file.buffer,
        };
      }
      const data = await this.fileService.createFile(fileData);
      res.status(201).json({ data, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  getFileById = async (req, res, next) => {
    try {
      const fileId = req.params.id;
      const findeFile = await this.fileService.findFileById(fileId);
      res.setHeader("Content-Type", "application/octet-stream");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${findeFile.fileName}`
      );
      res.send(findeFile.buffer);
    } catch (error) {
      next(error);
    }
  };

  deleteFile = async (req, res, next) => {
    try {
      const fileId = req.params.id;
      await this.fileService.deleteFile(fileId);
      res.status(200).json({ message: "deleted" });
    } catch (error) {
      next(error);
    }
  };
}

export default FilesController; 