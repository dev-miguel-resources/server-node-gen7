const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const subSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
      minlength: [2, "Too short"],
      maxlength: [32, "Too long"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    parent: { type: ObjectId, ref: "Category", required: true },
    status: {
      type: String,
      default: "Active",
      enum: ["Active", "Inactive"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sub", subSchema);
