import FileService from "./file.service.js";
import HttpException from "../exceptions/HttpException.js";
import CarDocument from "../models/carModel.js"; // Ձեր մոդելը
import { ObjectId } from "mongodb";





class CarService {
  constructor() {
    this.fileService = new FileService();
    this.cars = CarDocument
    
  }

  async getCarById(carId) {
    if (!ObjectId.isValid(carId)) {
      throw new HttpException(400, "Invalid car ID format");
    }
  
    let car=await this.cars.findOne({_id:carId})
    if (! car) {
      throw new HttpException(404, "car is not found");
    }
    return car
  }


  // async updateCar(carId,data) {

  //   const updatedCar = await this.cars.findByIdAndUpdate( new mongoose.Types.ObjectId(carId), data, { new: true });

  //       return updatedCar
  //     }
    
      async deleteCar(carId) {
        if (!ObjectId.isValid(carId)) {
          throw new HttpException(400, "is not a valid ObjectID");
        }
        const deleteCarById = await this.cars.findByIdAndDelete(carId);
        if (!deleteCarById) throw new HttpException(409, "Car doesn't exist");
    
        return deleteCarById;
      }



      // 
        async createCar(data) {

          
      if (!data.make||!data.model || !data.year ||!data.driver) {
        throw new HttpException(409, "data is invalid");
      }
        return  await this.cars.create(data);
        }


}

export default CarService;

