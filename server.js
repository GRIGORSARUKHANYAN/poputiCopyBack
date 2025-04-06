import express from "express";
import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";
import userRoutes from "./routes/user.routes.js";
import carRoutes from "./routes/car.routes.js";

import swaggerUI from "swagger-ui-express";
import yaml from "yamljs";
import mongoose from 'mongoose';
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.use(express.json());
mongoose.connect(process.env.MONGOLINK)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
app.use(cors())
const swaggerDocument = yaml.load("./swagger.yaml");
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/file", fileRoutes);
app.use("/car", carRoutes);



// function setupSwagger() {
//   const fileContents = fs.readFileSync(
//     path.join(path.resolve(), "app.yml"),
//     "utf8"
//   );
//   const doc = parse(fileContents);
//   app.use("/api-docs", swaggerUI.serve, swaggerUI. setup(doc));
// }
// setupSwagger()
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
