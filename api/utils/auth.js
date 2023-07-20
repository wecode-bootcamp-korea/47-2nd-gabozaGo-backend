const jwt = require("jsonwebtoken");
const { userDao } = require("../models");

const loginRequired = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const error = new Error("NEED_ACCESS_TOKEN");
    error.statusCode = 401;
    throw error;
  }

  const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
  const user = await userDao.getUserById(decodedToken.userId);

  if (!user) {
    const error = new Error("INVALID_ACCESS_TOKEN");
    error.statusCode = 401;
    throw error;
  }

  req.user = user;
  next();
};

module.exports = { loginRequired };
