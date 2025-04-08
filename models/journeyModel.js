import { Schema, model } from "mongoose";

const JourneySchema = new Schema({
  from: { type: String, default: "" },
  to: { type: String, default: "" },
  date: { type: Date, default: new Date() },
  driver: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: "Car",
  },
  
  passengers: [{
    type: Schema.Types.ObjectId,
    ref: "User",
    default:[]
  }],
  count: { type: Number, default: 0 },
});

const JourneyModel = model("Journeys", JourneySchema);

export default JourneyModel;
