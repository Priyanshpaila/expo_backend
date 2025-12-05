import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema(
  {
    division: { type: String, trim: true },
    product: { type: String, trim: true },
    productCategory: { type: String, trim: true },
    customerName: { type: String, required: true, trim: true },
    customerPhone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    location: { type: String, required: true, trim: true },
    productDescription: { type: String, trim: true },
    areaofInterest: { type: String, trim: true, default: "" },
    firmName: { type: String, trim: true, default: "" },
    feedback: { type: String, trim: true, default: "" },
    remark: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export const Lead = mongoose.model("Lead", LeadSchema);
