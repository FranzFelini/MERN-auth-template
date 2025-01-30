const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
//database connection (preferably MongoDB Atlas)
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("database connected!");
  })
  .catch((error) => {
    console.log("database NOT connected", error);
  });

// mid.W
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

//test route
app.use("/", require("./routes/authRoutes"));

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
