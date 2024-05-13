const jwt = require("jsonwebtoken");

exports.generateTokens = (req, res) => {
  const userId = req.user_Id;
  console.log("ID from Token generator", userId);

  //   const accessToken = jwt.sign({ userId }, "your_access_token_secret", {
  //     expiresIn: "1h",
  //   });

  //   const refreshToken = jwt.sign({ userId }, "your_refresh_token_secret", {
  //     expiresIn: "7d",
  //   });

  const accessToken = this.generateAccessToken(userId);
  const refreshToken = this.generateRefreshToken(userId);

  res.setHeader("Authorization", `Bearer ${accessToken}`);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(200).json({ message: "Logged In Successfully" });
  //   next();
};

exports.generateAccessToken = (userId) => {
  return jwt.sign({ user_Id: userId }, "your_access_token_secret", {
    expiresIn: "1h",
  });
};

exports.generateRefreshToken = (userId) => {
  return jwt.sign({ user_Id: userId }, "your_refresh_token_secret", {
    expiresIn: "7d",
  });
};
