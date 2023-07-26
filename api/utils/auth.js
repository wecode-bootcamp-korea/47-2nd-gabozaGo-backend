const jwt = require("jsonwebtoken");
const { userDao } = require("../models");

const loginRequired = async (req, res, next) => {
  const accessToken = req.headers.authorization;

  if (!accessToken) {
    const error = new Error("NEED_ACCESS_TOKEN");
    error.statusCode = 401;
    next(error);  
    return;
  }

  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await userDao.getUserById(decodedToken.userId);

    if (!user) {
      const error = new Error("INVALID_ACCESS_TOKEN");
      error.statusCode = 401;
      next(error);  
      return;
    }
  
    req.user = user;
    next();
  } catch (err) {
    next(err);  
  }
};

const tokenRequiredOrNot = async (req, res, next) => {
  const accessToken = req.headers.authorization;
  if (!accessToken) {
    return next();
  }
  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET);
    const user = await userDao.getUserById(decodedToken.userId);
    if (!user) {
      const error = new Error("INVALID_ACCESS_TOKEN");
      error.statusCode = 401;
      next(error);  
      return;
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);  
  }
};



module.exports = { loginRequired, tokenRequiredOrNot };
