const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");


const authMiddleWare = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
    try {
      if (token) {
        const decoded = jwt.verify(token, "1233",{algorithms: ['HS256'] ,expiresIn: '1h'});
        next();
      }
    } catch (error) {
      throw new Error("not authorized token expired,please login again");
    }
  } else {
    return res.status(500).send({msg:"there is no token attached to header"});
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  let token;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];

    try {
      if (token) {
        const decoded = jwt.verify(token, "1233",{algorithms: ['HS256'] ,expiresIn: '1h'});
        const user = await User.findById(decoded?.id);
     
        const { email } = user;
        const adminUser = await User.findOne({ email });
        // console.log("adminUser", adminUser);
        if (adminUser.role.toLowerCase() !== "admin" ) {
          throw new Error("you are not a employer..");
        } else {
          next();
        }
      }
    } catch (error) {
      throw new Error("you are not a employer");
    }
  }
 
});

module.exports = { authMiddleWare, isAdmin };
