import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema(
  {
    division: { type: String, required: true, trim: true },
    product: { type: String, required: true, trim: true }, 
    productCategory: { type: String, required: true, trim: true },
    customerName: { type: String, required: true, trim: true },
    customerPhone: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    location: { type: String, required: true, trim: true },
    productDescription: { type: String, required: true, trim: true },
    remark1: { type: String, trim: true, default: '' },
    remark2: { type: String, trim: true, default: '' }
  },
  { timestamps: true }
);


export const Lead = mongoose.model('Lead', LeadSchema);
