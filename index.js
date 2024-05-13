const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRoutes = require("./Routes/User/Auth");
const profileRoutes = require("./Routes/User/Profile");

const dbConnection = require("./DBConfig");

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.use(cors());
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to FreelancePay");
});

app.listen("3001", () => {
  console.log("App is running on Port: http://localhost:3001");
});
