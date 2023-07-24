const { likesDao } = require("../models");

const createLikes = async (userId, targetId) => {
  const likes = await likesDao.getLikes(userId, targetId);
  if (likes.length > 0) {
    await likesDao.deleteLikes(userId, targetId);
    return "SUCCESS_DELETE_LIKES";
  } else {
    await likesDao.createLikes(userId, targetId);
    return "SUCCESS_CREATE_LIKES";
  }
};

const getUserLikes = async (userId) => {
  return await likesDao.getUserLikes(userId);
};
module.exports = {
  getUserLikes,
  createLikes,
};
