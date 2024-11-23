const mongoose = require("mongoose");

const addressScheme = new mongoose.Schema(
  {
    flatno: {
      type: String,
    },
    housename: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipcode: {
      type: String,
    },
    // userId: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Address", addressScheme);
