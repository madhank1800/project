
const express = require("express");

const {authMiddleWare}=require('../middlewares/authMiddleware');
const router = express();
const enquiryController =require('../controllers/enquiryController');
router.post('/save',enquiryController.createEnquiry);
router.get('/all',enquiryController.getAllQueris);
module.exports=router;