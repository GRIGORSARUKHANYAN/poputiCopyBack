import { Schema, model } from "mongoose";

const OrderSchema = new Schema({
  from: { type: String, default: "" },
  to: { type: String, default: "" },
  data: { type: Date,  },
  price: { type: Number, default: 0 },
  count: { type: Number, default: 0 },
  driverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const OrderModel = model("Orders", OrderSchema);

export default OrderModel;
