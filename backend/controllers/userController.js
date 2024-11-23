const { generateToken } = require("../config/jwtToken");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const { validateMongodbId } = require("../utils/validateMongodbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const { emailSender } = require("./emailController");
const passport = require("passport");
const apiResponse = require("../helpers/helpers");
const Address = require("../models/addressModel");

const createUSer = asyncHandler(async (req, res) => {
  try {
    const email = req.body.email;

    const findUser = await User.findOne({ email: email });

    if (!findUser) {
      // console.log(req.body)
      const { flatno, housename, city, state, zipcode } = req.body;
      const address = new Address({ flatno, housename, city, state, zipcode });
      await address.save();

      //create a new user
      const newUser = await User.create({ address: address._id, ...req.body });
      // res.json(newUser);
      newUser.save();
      return res.status(200).send({ message: "Created" });
    } else {
      return res
        .status(400)
        .send({ message: "user already available with this email" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//login functionality
const loginUserCtrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  //check if user exist or not
  const findUser = await User.findOne({ email });
  if (findUser && (await findUser.isPasswordMatched(password))) {
    const address = await Address.findById(findUser?.address, {
      __v: 0,
      createdAt: 0,
      updatedAt: 0,
    });
    const refreshToken = await generateRefreshToken(findUser?._id);

    const token = generateToken(findUser?._id);
    // console.log(token)
    res.status(200).json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      email: findUser?.email,
      mobile: findUser?.mobile,
      employeeId: findUser?.employeeId,
      role: findUser?.role,
      department: findUser?.department,
      doj: findUser?.joiningdate,
      designation: findUser?.designation,
      address: address,
      token: token,
    });
  } else {
    return res.status(400).json({ error: "Invalid credentials" });
  }
});

//change password

const updatePassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { password } = req.body;
  validateMongodbId(_id);
  const user = await User.findById(_id);
  if (password) {
    user.password = password;
    console.log("pass", user.password);
    const updatedPassword = await user.save();
    res.json(updatedPassword);
  } else {
    res.json(user);
  }
});

//forget password token

const forgetPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new Error("user not found with this email");
  try {
    const token = await user.createPasswordResetToken();
    await user.save();
    const reset_url = `hi please follow this link to reser your password.this link is valid for ten minutes now. <a href='http://localhost:8080/api/user/reset-password/${token}'>Click Here</>`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forgot Password Link",
      htm: reset_url,
    };
    emailSender(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

//reset password

const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) throw new Error(" Token Expired, Please try again later");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
  res.json(user);
});

//handle refresh token

const handlerefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  console.log("test:-", cookie);
  if (!cookie?.refreshToken) throw new Error("no refresh token in cookies");
  const refreshToken = cookie.refreshToken;
  console.log("refreshtoken", refreshToken);
  const user = await User.findOne({ refreshToken });
  console.log("user1", user);
  if (!user) throw new Error("NO refrsh token present in db or not matched");

  jwt.verify(refreshToken, process.env.SECRET_KEY, (err, decoded) => {
    console.log("decoded:", decoded);
    if (err && user._id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }

    const accessToken = generateToken(user?._id);
    res.json({ accessToken });
  });
});

//log out functionality

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("no refresh token in cookies");
  const refreshToken = cookie.refreshToken;
  const user = await User.findOne({ refreshToken });
  console.log("usss:", user);
  if (!user) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(204);
  }

  // await User.findOneAndUpdate(refreshToken,{
  //    refreshToken:""
  // });

  await User.findOneAndUpdate(
    { refreshToken: refreshToken },
    { $set: { refreshToken: "" } },
    { new: true }
  );

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

//get-all users
const getallUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await User.find(
      {},
      { createdAt: 0, updatedAt: 0, isBlocked: 0, password: 0, __v: 0 }
    ).populate("address");
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});
const getallEmployeecodes = asyncHandler(async (req, res) => {
  try {
    const ids = [];
    const getUsers = await User.find(
      {},
      { createdAt: 0, updatedAt: 0, isBlocked: 0, password: 0, __v: 0 }
    );
    getUsers.map((user) => ids.push(user.employeeId));
    // console.log(ids)
    res.json(ids);
  } catch (error) {
    throw new Error(error);
  }
});

// get a user by Id
const getaUser = asyncHandler(async (req, res) => {
  // console.log(req.params);
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const getuser = await User.findById(id);
    res.json(getuser);
  } catch (error) {
    throw new Error(error);
  }
});

//delete a user by id
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const deleteuser = await User.findByIdAndDelete(id);
    res.json("Deleted");
  } catch (error) {
    throw new Error(error);
  }
});

//update a user by id
const updatedUser = asyncHandler(async (req, res) => {
  // const {id}=req.params;
  const id = req.params.id;
  // console.log(req.body)
  const {
    firstname,
    lastname,
    email,
    mobile,
    role,
    department,
    designation,
    joiningdate,
    flatno,
    housename,
    city,
    state,
    zipcode,
  } = req.body;
  validateMongodbId(id);
  try {
    // Update user details
    const updateUser = await User.findByIdAndUpdate(
      id,
      {
        firstname,
        lastname,
        email,
        mobile,
        role,
        department,
        designation,
        joiningdate,
      },
      { new: true, projection: { password: 0, updatedAt: 0, __V: 0 } }
    );

    if (updateUser.address) {
      const updateAddress = await Address.findByIdAndUpdate(
        updateUser.address,
        {
          flatno,
          housename,
          city,
          state,
          zipcode,
        },
        { new: true,  }
      );
    }
    await updateUser.populate("address");
    res.status(200).send({ message: "Updated", data: updateUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
  } catch (error) {
    throw new Error(error);
  }
  res.json({
    message: "user Blocked",
  });
});

const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
  } catch (error) {
    throw new Error(error);
  }

  res.json({
    message: "user Blocked",
  });
});

module.exports = {
  createUSer,
  loginUserCtrl,
  getallUsers,
  getaUser,
  deleteUser,
  updatedUser,
  blockUser,
  unblockUser,
  handlerefreshToken,
  logout,
  updatePassword,
  forgetPasswordToken,
  resetPassword,
  getallEmployeecodes,
};
