import { Schema, model } from "mongoose";

const CarSchema = new Schema({
  make: { type: String, default: "" },
  model: { type: String, default: "" },
  year: { type: Number, default: 2000 },
  driver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  carImages: [{
    type: Schema.Types.ObjectId,
    ref: "File",
  }],

});

const CarModel = model("Cars", CarSchema);

export default CarModel;
