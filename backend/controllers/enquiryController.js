const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const Enquiry = require("../models/enquiryModel");

const createEnquiry = asyncHandler(async (req, res) => {
  try {
    // console.log(req.body);
    const info = await new Enquiry(req.body);
    info.save();
    return res.status(201).send({
      message: "We received your information.We will get back to you soon",
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

const getAllQueris = asyncHandler(async (req, res) => {
  try {
    // console.log(req.body);
    const info = await Enquiry.find({}, { createdAt: 0, updatedAt: 0, __v: 0 });
    
    return res.status(201).send(info);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
module.exports = { createEnquiry, getAllQueris };
