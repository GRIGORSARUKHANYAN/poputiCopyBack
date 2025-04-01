import { Schema, model } from "mongoose";

const fileSchema = new Schema({
  buffer: Buffer,
  fileName: String,
});

const fileModel = model("File", fileSchema);

export default fileModel;
