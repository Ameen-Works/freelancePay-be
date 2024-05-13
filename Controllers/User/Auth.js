const User = require("../../Models/UserSchema");
const protectPassword = require("../../Middlewares/protectPassword");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      phoneNumber,
      address,
      dateOfBirth,
      accountType,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(501).json({ error: "User Already Exist" });
    } else {
      const user = new User({
        name,
        email,
        password,
        phoneNumber,
        address,
        dateOfBirth,
        accountType,
      });

      await user.save();

      res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await protectPassword.comparePassword(
      password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    console.log("User ID:", user._id.toString());
    req.user_Id = user._id.toString();
    next();
    // res.status(200).json({ messoge: "Logged In Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
