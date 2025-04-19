import UserService from "../services/user.service.js";
import FileService from "../services/file.service.js";
import jwt from "jsonwebtoken";

class UserController {
  constructor() {
    this.userService = new UserService();
    this.fileService = new FileService();

  }
  udateProfilePhoto = async (req, res, next) => {
    try {
      
      const token = req.header("Authorization")?.split("Bearer ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
      const profilePhoto = req.files?.profilePhoto?.[0] || null;
      // const driversLicenseImage = req.files?.driversLicenseImage?.[0] || null ;
      
      let a = await this.fileService.createFile({fileName:new Date(),buffer:profilePhoto.buffer})
      if (!a) {
        return res.status(400).json({  message: "data is invalid" });
      }
      let data={profilePhoto:a._id}
      
let userData = await this.userService.udateProfilePhoto(decoded.id,data)

console.log("kkkkkkkkkkkk",userData);

      res.status(201).json({ data: userData, message: "update Profile Photo successfully" });
    } catch (error) {
      next(error);
    }
  };




  getUserById = async (req, res, next) => {
    try {
      const userId = req.params.id;

let userData = await this.userService.getUserById(userId)

      res.status(201).json({ data: userData, message: "User login successfully" });
    } catch (error) {
      next(error);
    }
  };


  personalInformation = async (req, res, next) => {
    try {
      const token = req.header("Authorization")?.split("Bearer ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      const data = req.body;
data.role=decoded.role
      // Ստանում ենք ֆայլերը
      const pasportImage = req.files?.pasportImage?.[0] || null;
      const driversLicenseImage = req.files?.driversLicenseImage?.[0] || null ;


let a = await this.fileService.createFile({fileName:new Date(),buffer:pasportImage.buffer})
let b = await this.fileService.createFile({fileName:new Date(),buffer:driversLicenseImage.buffer})
data.pasportImage=a._id 
data.driversLicenseImage=b._id 

if (!this.validator(data)) {
  

  return res.status(400).json({  message: "data is invalid" });
  
}


let userData = await this.userService.personalInformation(decoded.id,data)


      res.status(201).json({ data: userData, message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  };



  validator =  (data) => {
    
    if (!data || !data.city || !data.name || !data.surname || !data.phoneNumber || !data.pasportData  || !data.birthDay|| !data.gender ) {
      return false
    }
    
    if (data.role=="driver") {
      if (!data.pasportImage || !data.driversLicenseImage || !data.driversLicense ) {
    return false
  }
  
}else if (data.role=="student") {
if (!data.pasportImage || !data.university) {
  return false
}
}
return true
  };

}

export default UserController;

// university: { type: String, default: "" },

// pasportImage: {
//   type: Schema.Types.ObjectId,
//   ref: "File",
// },

// // prava
// driversLicense:{ type: String, default: "" },
// driversLicenseImage: {
//   type: Schema.Types.ObjectId,
//   ref: "File",
// },
