import HttpException from "../exceptions/HttpException.js";
import { isEmpty } from "../utils/util.js";
import { ObjectId } from "mongodb";
import FileDocument from "../models/fileModel.js"; // Ձեր մոդելը

class FileService {
  constructor() {
    this.files = FileDocument
  }

  async findFileById(fileId) {
    if (!ObjectId.isValid(fileId)) {
      throw new HttpException(400, "is not a valid ObjectID");
    }
    const findFile = await this.files.findOne({ _id: fileId });
    if (!findFile) {
      throw new HttpException(409, "File not found");
    }

    return findFile;
  }

  async createFile(fileData) {
    
    if (isEmpty(fileData)) {
      throw new HttpException(400, "FileData is empty");
    }
    // console.log("hasav",fileData);
    const createFileData = await this.files.create(fileData);
    return createFileData;
  }

  async deleteFile(fileId) {
    if (!ObjectId.isValid(fileId)) {
      throw new HttpException(400, "is not a valid ObjectID");
    }
    const deleteFileById = await this.files.findByIdAndDelete(fileId);
    if (!deleteFileById) throw new HttpException(409, "File doesn't exist");

    return deleteFileById;
  }
}

export default FileService;
