import AuthService from "../services/auth.service.js";

class AuthController {
  constructor() {
    this.authService = new AuthService();
  }


  login = async (req, res, next) => {
    try {
      const data = req.body;
let userData = await this.authService.login(data)

      res.status(201).json({ data: userData, message: "User login successfully" });
    } catch (error) {
      next(error);
    }
  };

  createUser = async (req, res, next) => {
    try {
      const data = req.body;
let userData = await this.authService.createUser(data)

      // Ստանում ենք ֆայլերը
//       const pasportImage = req.files?.pasportImage?.[0] || null;
//       const driversLicense = req.files?.driversLicense || [];
// console.log(pasportImage,driversLicense);
// await this.authService.createUser(pasportImage,driversLicense,data)
      // Պահպանում ենք տվյալները
    //   const userData = {
    //     name,
    //     surname,
    //     pasportImage: pasportImage ? await this.authService.saveFile(pasportImage) : null,
    //     carImages: await Promise.all(carImages.map((file) => this.authService.saveFile(file))),
    //   };

      res.status(201).json({ data: userData, message: "User registered successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
