require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
// const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

// database
const connectDB = require("./db/connect");

// error handler
const { notFoundMiddleware, errorHandlerMiddleware } = require("./middleware");

// third-party and express middleware
app.use(express.static("./public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(morgan("tiny"));
app.use(cookieParser());
app.use(cors());

// ===============================================================
// Importing Routers
const auth = require("./routes/api/auth");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// Applying Router to app
app.use(express.static(path.join(__dirname, "./client/build")));

app.get("/api/v1/", (req, res) => {
  res.send("yes");
});

app.use("/api/v1/auth/", auth);
app.use("/api/v1/users/", users);
app.use("/api/v1/profiles/", profile);
app.use("/api/v1/posts/", posts);

app.get("*", (_, res) => {
  res.sendFile(
    path.resolve(__dirname, "client", "build", "index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

// ==============================================================
// Error and Not Found middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    connectDB(process.env.MONGO_URL);
    mongoose.connection.once("open", () =>
      console.log("Connected to Database MongoDB")
    );
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
