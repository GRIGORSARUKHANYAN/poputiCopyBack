import FileService from "./file.service.js";
import HttpException from "../exceptions/HttpException.js";
import UserDocument from "../models/userModel.js"; // Ձեր մոդելը
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";




class UserService {
  constructor() {
    this.fileService = new FileService();
    this.users = UserDocument
    
  }

  async getUserById(userId) {
    if (!ObjectId.isValid(userId)) {
      throw new HttpException(400, "Invalid user ID format");
    }
  
    let user=await this.users.findOne({_id:userId})
    if (! user) {
      throw new HttpException(404, "user is not found");
    }
    return user
  }


  async udateProfilePhoto(userId,data) {


    const updatedUser = await this.users.findByIdAndUpdate( new mongoose.Types.ObjectId(userId), data, { new: true });
    console.log(userId,mongoose.Types.ObjectId.isValid(userId),data,updatedUser);
        return userId
      }
    

  async personalInformation(userId,data) {
console.log(userId);



    const updatedUser = await this.users.findByIdAndUpdate(userId, data, { new: true });
    return updatedUser
  }

  // async createUser(pasportImage, data) {
  //   console.log("hasav", pasportImage, carImages, data);
  //   let fileData = {
  //     fileName: new Date(),
  //     buffer: pasportImage.buffer,
  //   };
  //   await this.fileService.createFile(fileData);
  // }

  //  validation(data) {
  //   if (!data.role) {
  //     return false
  //   }
  //   if (data.role== "driver") {
      
  //   }
  // }


}

export default UserService;

// role: { type: Number, default: 1 },
// login: { type: String, default: "" },
// password: { type: String, default: "" },
// position: { type: String, default: "" },
// name: { type: String, default: "" },
// surname: { type: String, default: "" },
// patronymic: { type: String, default: "" },
// phoneNumber: { type: String, default: "" },
// mail: { type: String, default: "" },
// university: { type: String, default: "" },
// pasportData: { type: String, default: "" },
// pasportImage: {
//   type: Schema.Types.ObjectId,
//   ref: "File",
// },
// // prava
// driversLicense: { type: String, default: "" },
// gender: { type: String, default: "" },
