const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");

/*
Important Notice:
This is a work-in-progress version of the authentication system. 
It is intended only as a starting point for development.
 Please note that validation is currently incomplete and unreliable. 
 Do not use this in any production environment. It is critical to improve security, 
 implement thorough validation, and conduct additional testing before deploying a final product.
*/

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

//ROUTE TO TEST IT hahah :d
app.use("/", require("./routes/authRoutes"));

const port = 8000;
app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
