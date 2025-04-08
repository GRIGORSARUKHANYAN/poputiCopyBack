import FileService from "./file.service.js";
import HttpException from "../exceptions/HttpException.js";
import JourneyDocument from "../models/journeyModel.js"; // Ձեր մոդելը
import { ObjectId } from "mongodb";
import mongoose from "mongoose";




class JourneyService {
  constructor() {
    this.fileService = new FileService();
    this.journeys = JourneyDocument
    
  }

  async getJourneys() {

  
    let journeys=await this.journeys.find()
    if (! journeys) {
      throw new HttpException(404, "journey is not found");
    }
    return journeys
  }

  async getJourneyById(journeyId) {
    if (!ObjectId.isValid(journeyId)) {
      throw new HttpException(400, "Invalid journey ID format");
    }
  
    let journey=await this.journeys.findOne({_id:journeyId})
    if (! journey) {
      throw new HttpException(404, "journey is not found");
    }
    return journey
  }


  async joinJourney(journeyId, userId) {
    if (!ObjectId.isValid(journeyId)) {
      throw new HttpException(400, "Invalid journey ID format");
    }
  
    const objectId = new mongoose.Types.ObjectId(journeyId);
  
    const journey = await this.journeys.findOne({ _id: objectId });
    if (!journey) {
      throw new HttpException(400, "Invalid journey ID");
    }
  
    if (journey.passengers.includes(userId)) {
      throw new HttpException(400, "User already joined this journey");
    }
  
    if (journey.count <= 0) {
      throw new HttpException(400, "No more seats available");
    }
  
    const updatedJourney = await this.journeys.findByIdAndUpdate(
      objectId,
      {
        $push: { passengers: userId },
        $inc: { count: -1 }
      },
      { new: true }
    );
  
    return updatedJourney;
  }
      async deleteJourney(journeyId) {
        if (!ObjectId.isValid(journeyId)) {
          throw new HttpException(400, "is not a valid ObjectID");
        }
        const deletejourneyById = await this.journeys.findByIdAndDelete(journeyId);
        if (!deletejourneyById) throw new HttpException(409, "journey doesn't exist");
    
        return deletejourneyById;
      }



      // 
        async createJourney(data) {
          console.log(data);
          
      if (!data.from||!data.to || !data.date ||!data.count||!data.driver || !data.car) {
        throw new HttpException(409, "data is invalid");
      }
        return  await this.journeys.create(data);
        }


}

export default JourneyService;

