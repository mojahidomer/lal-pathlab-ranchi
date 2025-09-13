import mongoose, { Schema, Document } from "mongoose";

export interface ICustomer extends Document {
  fullName: string;
  phoneNumber: string;
  details?: string; // can store extra info
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema: Schema = new Schema<ICustomer>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    details: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // adds createdAt & updatedAt
);

export default mongoose.models.Customer ||
  mongoose.model<ICustomer>("Customer", CustomerSchema);
