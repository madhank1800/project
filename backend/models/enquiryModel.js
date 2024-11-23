const mongoose = require("mongoose");

var enquirySchema = new mongoose.Schema(
  {
    name: { type: String },
    companyname: {
      type: String,
    },
    email: {
      type: String,
    },
    mobile: {
      type: Number,
    },
    idea: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enquiry", enquirySchema);
