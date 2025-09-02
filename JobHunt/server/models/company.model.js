import mongoose from "mongoose";
const companySchema = new mongoose.Schema(
  {
    CompanyName: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    logo: {
      type: String,
    },
    location: {
      type: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Company = mongoose.model("Company", companySchema);
