import mongoose from "mongoose";

const PostOfficeSchema = new mongoose.Schema(
  {
    zip_code: { type: String, required: true, unique: true },
    location: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("PostOffice", PostOfficeSchema);
