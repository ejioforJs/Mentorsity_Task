const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/userModel")

const userRouter = require("./routes/userRoutes");

dotenv.config();

mongoose
  .connect(process.env.MONGODBURI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.use(
    session({
      secret: process.env.SECRETKEY,
      resave: true,
      saveUninitialized: true,
    })
  );

  app.use("/users", userRouter)

  app.listen(5000, () => {
    console.log(`server at http://localhost:5000`);
  });
