const express = require("express");
const dbConnect = require("./config/dbConnect");
const app = express();
const cors = require("cors");
const authRouter = require("./Routes/authRouter");
const documentRouter = require("./Routes/documentRouter");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { errorHandler, notFound } = require("./middlewares/errorhandling");
const dotenv = require("dotenv").config();
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const enquiryRouter = require("./Routes/enquiryRoute");
dbConnect();
const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

const corsOptions = {
  AccessControlAllowOrigin: "http://localhost:3000/",
  origin: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));
app.use(morgan("dev"));

app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
  })
);
app.use("/api/user", authRouter);
app.use("/api/document", documentRouter);
app.use("/api/enquiry", enquiryRouter);
app.use(notFound);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server running  on on port ${PORT}`);
});
