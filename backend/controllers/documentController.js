const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");
const Document = require("../models/documentModel");
const User = require("../models/userModel");

const createDocument = asyncHandler(async (req, res) => {
  try {
    const { empId } = req.body;
    const files = req.files["files[]"];
    console.log("===>", empId, files);
    const user = await User.findOne({ employeeId: empId });
    //  const findUserById=await User.findById({ employeeId: empId });
    console.log(user._id);
    if (!user) throw new Error("user not found");
    console.log(files.length, "16");

    if (files.length === undefined || files.length === null) {
      console.log("if");
      const document = new Document({
        userId: user._id,
        documentName: files.name,
        documentedContent: files.data.toString("base64"),
      });
      const savedDocument = await document.save();
      user?.Document.push(savedDocument._id);

      await user.save();
    } else {
      const documentIds = [];

      for (const doc of files) {
        const document = new Document({
          userId: user._id,
          documentName: doc.name,
          documentedContent: doc.data.toString("base64"),
        });
        const savedDocument = await document.save();
        documentIds.push(savedDocument._id);
      }

      // Add all document ids to user's Document array
      user?.Document.push(...documentIds);
      await user.save();
    }

    res.json({ message: "Documents uploaded successfully" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
const downloadDocument = asyncHandler(async (req, res) => {
  try {
    console.log(req.params.id);
    const getDoc = await Document.findById(req.params.id);

    if (!getDoc) {
      return res.status(404).send("PDF document not found");
    }
    const binaryData = Buffer.from(getDoc.documentedContent, "base64");
    // Set response headers for PDF download
    // res.setHeader("Content-Type", "application/pdf");
    // res.setHeader(
    //   "Content-Disposition",
    //   `attachment; filename=${getDoc?.documentName}.pdf`
    // );
    // res.setHeader("Content-Length", binaryData.length);

    res.send(binaryData);
  } catch (err) {
    res.status(500).send(err);
  }
});

const getAllDocumentsByEmpID = asyncHandler(async (req, res) => {
  try {
    console.log(req.params.empId);
    const user = await User.findById(req.params.empId).populate("Document");

    console.log(user.Document.length);

    res.status(200).send(user.Document);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = { createDocument, downloadDocument, getAllDocumentsByEmpID };

//   const documentPromises = files.map(async (file) => {
//     const document = new Document({
//       userId:user._id,
//       documentName:file.fileName,
//       documentedContent: file.buffer.toString('base64')
//     });
//     await document.save();
//     user.Document = user.Document || [];
//     user.Document.push(document._id);
//   });

//   await Promise.all(documentPromises);
//   await user.save();

// res.json({ message: "Documents uploaded successfully" });
