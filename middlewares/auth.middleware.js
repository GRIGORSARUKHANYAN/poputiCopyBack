import jwt from "jsonwebtoken";
import HttpException from "../exceptions/HttpException.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    
    const token = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split("Bearer ")[1] : null;

    if (!token) {
      return next(new HttpException(404, "Authentication token missing"));
    }

    jwt.verify(token, process.env.SECRET_KEY || "", (err, decoded) => {
      if (err) {
        return next(new HttpException(401, "Wrong authentication token"));
      }
      next();
    });
  } catch (err) {
    next(new HttpException(401, "Error verifying authentication token"));
  }
};

export default authMiddleware;
