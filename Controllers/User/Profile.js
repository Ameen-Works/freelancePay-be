const User = require("../../Models/UserSchema");

exports.profile = async (req, res) => {
  const user_id = req.userId;
  //   console.log(req);
  try {
    const user = await User.findById(user_id);
    res
      .status(201)
      .json({ status: "Success", message: "Data Processed", data: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
