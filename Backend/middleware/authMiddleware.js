const jwt = require("jsonwebtoken");
const UserModel = require("../models/user");

const requireAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ error: "Invalid token" });

      req.user = await UserModel.findById(decoded.id).select("-password");
      next();
    });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { requireAuth };
