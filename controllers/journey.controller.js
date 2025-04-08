import JourneyService from "../services/journey.service.js";
import FileService from "../services/file.service.js";
import jwt from "jsonwebtoken";

class JourneyController {
  constructor() {
    this.journeyService = new JourneyService();
    this.fileService = new FileService();

  }
//   udateProfilePhoto = async (req, res, next) => {
//     try {
//       const token = req.header("Authorization")?.split("Bearer ")[1];
//       const decoded = jwt.verify(token, process.env.SECRET_KEY);
  
//       const profilePhoto = req.files?.profilePhoto?.[0] || null;
//       // const driversLicenseImage = req.files?.driversLicenseImage?.[0] || null ;
      
//       let a = await this.fileService.createFile({fileName:new Date(),buffer:profilePhoto.buffer})
//       if (!a) {
//         return res.status(400).json({  message: "data is invalid" });
//       }
//       let data={profilePhoto:a._id}
// let userData = await this.userService.udateProfilePhoto(decoded._id,data)


//       res.status(201).json({ data: userData, message: "update Profile Photo successfully" });
//     } catch (error) {
//       next(error);
//     }
//   };

deleteJourney = async (req, res, next) => {
  try {
    const journeyId = req.params.id;
let journeyData = await this.journeyService.deleteJourney(journeyId)

    res.status(201).json({ data: journeyData, message: "journeys delete successfully" });
  } catch (error) {
    next(error);
  }
};


joinJourney = async (req, res, next) => {
  try {
    const journeyId = req.params.id;
    const token = req.header("Authorization")?.split("Bearer ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    
let journeyData = await this.journeyService.joinJourney(journeyId,decoded.id)

    res.status(201).json({ data: journeyData, message: "journeys get successfully" });
  } catch (error) {
    next(error);
  }
};


createJourney = async (req, res, next) => {
  try {
    const data = req.body;
      const token = req.header("Authorization")?.split("Bearer ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
  data.driver=decoded.id
let journeyData = await this.journeyService.createJourney(data)

    res.status(201).json({ data: journeyData, message: "journeys get successfully" });
  } catch (error) {
    next(error);
  }
};




  getJourneyById = async (req, res, next) => {
    try {
      const journeyId = req.params.id;

let journeyData = await this.journeyService.getJourneyById(journeyId)

      res.status(201).json({ data: journeyData, message: "journey get successfully" });
    } catch (error) {
      next(error);
    }
  };

  getJourneys = async (req, res, next) => {
    try {

let journeyData = await this.journeyService.getJourneys()

      res.status(201).json({ data: journeyData, message: "journey get successfully" });
    } catch (error) {
      next(error);
    }
  };



}

export default JourneyController;

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
