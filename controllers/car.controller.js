import CarService from "../services/car.service.js";
import FileService from "../services/file.service.js";
import jwt from "jsonwebtoken";

class CarController {
  constructor() {
    this.carService = new CarService();
    this.fileService = new FileService();

  }
  createCar = async (req, res, next) => {
    try {
let data =req.body
      const token = req.header("Authorization")?.split("Bearer ")[1];
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      data.driver=decoded.id

let carData = await this.carService.createCar(data)


      res.status(201).json({ data: carData, message: "update Profile Photo successfully" });
    } catch (error) {
      next(error);
    }
  };




  getCarById = async (req, res, next) => {
    try {
      const carId = req.params.id;

let carData = await this.carService.getCarById(carId)

      res.status(201).json({ data: carData, message: "Car get successfully" });
    } catch (error) {
      next(error);
    }
  };

  getCarByUserId = async (req, res, next) => {
    try {
      const userId = req.params.id;

let carData = await this.carService.getCarByUserId(userId)

      res.status(201).json({ data: carData, message: "Car get successfully" });
    } catch (error) {
      next(error);
    }
  };




  deleteCar = async (req, res, next) => {
    try {
      const carId = req.params.id;
      await this.carService.deleteCar(carId);
      res.status(200).json({ message: "deleted" });
    } catch (error) {
      next(error);
    }
  };

}

export default CarController;

