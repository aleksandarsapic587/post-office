import mongoose from "mongoose";

const ShipmentSchema = new mongoose.Schema(
  {
    type: { type: String, required: true, enum: ["letter", "package"] },
    weight: { type: String, required: true, emum:["Less than 1kg", "Between 1kg and 5kg", "More than 5kg"] },
    status: { type: String, required: true, enum: ["origin", "destination", "delivered"] },
    origin_zip_code: { type: String, required: true },
    destination_zip_code: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Shipment", ShipmentSchema);
