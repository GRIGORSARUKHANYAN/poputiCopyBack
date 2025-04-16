import FileService from "../services/file.service.js";
import HttpException from "../exceptions/HttpException.js";
import UserDocument from "../models/userModel.js"; // Ձեր մոդելը
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthService {
  constructor() {
    this.fileService = new FileService();
    this.users = UserDocument
    
  }

  async login(data) {


const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
function isValidEmail(email) {
  return emailRegex.test(email);
}
if (!data.email || !data.password || !isValidEmail(data.email)) {
  throw new HttpException(409, "data is invalid");
}
let user=await this.users.findOne({email:data.email})
if (! user) {
  throw new HttpException(404, "user is not found");
}
const isPasswordValid = await bcrypt.compare(data.password, user.password);
if (!isPasswordValid) {
  return res.status(401).json({ message: "Invalid email or password" });
}
const token = jwt.sign({ id: user.id, email: user.email,role:user.role }, process.env.SECRET_KEY, {
  expiresIn: "10000000h", // Թոքենի վավերականությունը՝ 1 ժամ
});
  return  {token:token,id:user._id};
  }



  async createUser(data) {

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
function isValidEmail(email) {
  return emailRegex.test(email);
}
if (!data.role||!data.email || !data.password ||(data.role!=="driver"&&data.role!=="student")|| !isValidEmail(data.email)) {
  console.log(data);
 
  throw new HttpException(409, "data is invalid");
}
if (await this.users.findOne({email:data.email})) {
  throw new HttpException(409, "This email is already registered.");
}
data.password=   await bcrypt.hash(data.password, Number(process.env.saltRounds));
  return  await this.users.create(data);
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

export default AuthService;

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
