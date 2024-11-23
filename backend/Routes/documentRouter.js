const express = require("express");
const passport = require("passport");

const {
  authMiddleWare,
  authenticateBearer,
  isAdmin,
} = require("../middlewares/authMiddleware");
const router = express();
const {
  createDocument,
  downloadDocument,getAllDocumentsByEmpID
} = require("../controllers/documentController.js");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads"); // Destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use original file name
  },
});
const upload = multer({ storage: storage });
router.post(
  "/upload",
  // upload.single("file"),
  authMiddleWare,
  isAdmin,
  createDocument
);
router.get("/download/:id",authMiddleWare, downloadDocument);
router.get("/getAll/:empId",authMiddleWare, getAllDocumentsByEmpID);

module.exports = router;
