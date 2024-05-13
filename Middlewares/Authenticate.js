const jwt = require("jsonwebtoken");
const { generateAccessToken } = require("./tokenGenerator");

exports.authenticate = (req, res, next) => {
  // Get token from authorization header
  const accessToken = req.headers.authorization?.split(" ")[1];

  if (!accessToken) {
    return res.status(401).json({ message: "Access token not provided" });
  }

  // Verify access token
  jwt.verify(accessToken, "your_access_token_secret", (err, decoded) => {
    if (err) {
      // Access token expired or invalid
      const refreshToken = req.cookies.refreshToken;

      if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token not provided" });
      }

      // Verify refresh token
      jwt.verify(refreshToken, "your_refresh_token_secret", (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Invalid refresh token" });
        }

        // Refresh access token
        const newAccessToken = generateAccessToken(decoded.userId);
        res.setHeader("Authorization", `Bearer ${newAccessToken}`);
        req.userId = decoded.user_Id;
        next();
      });
    } else {
      // Access token valid
      req.userId = decoded.user_Id;
      next();
    }
  });
};
