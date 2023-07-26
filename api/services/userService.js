const userDao = require("../models/userDao");
const axios = require("axios");
const jwt = require("jsonwebtoken");

const signIn = async (kakaoCode) => {
  const clientId = process.env.CLIENT_ID;
  const redirectUri = process.env.REDIRECT_URI;

  const kakaoToken = await axios({
    method: "POST",
    url: "https://kauth.kakao.com/oauth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
    },
    data: {
      grant_type: "authorization_code",
      client_id: clientId,
      redirect_uri: redirectUri,
      code: kakaoCode,
    },
  });

  const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
    headers: {
      Authorization: `Bearer ${kakaoToken.data.access_token}`,
    },
  });

  const {
    id: socialId,
    properties: { nickname: name },
    kakao_account: {
      profile: { profile_image_url: profileImage },
    },
  } = response.data;

  let user = await userDao.getUserBySocialId(socialId);

  const jwtOptions = {
    algorithm: process.env.ALGORITHM,
    expiresIn: process.env.JWT_EXPIRES_IN,
  };

  let newUser = false;

  if (user.length === 0) {
    await userDao.signUp(name, socialId, profileImage);
    user = await userDao.getUserBySocialId(socialId);
    newUser = true;
  }

  let accessToken = jwt.sign({ userId: user[0].id }, process.env.JWT_SECRET, jwtOptions);

  if (user.length > 0) {
    if (user[0].signup_status === 0) {
      newUser = true;
    }
  }

  return { newUser, accessToken };
};

const updateUserInfo = async (userId, userSpot, userActivities, { socialPlatform, phoneNumber }) => {
  try {
    await userDao.updateUserInfo.execute(userId, userSpot, userActivities, {
      socialPlatform,
      phoneNumber,
    });
    return { message: "SUCCESS_UPDATE_USER_INFO" };
  } catch (err) {
    console.error(err);
    return { message: "UPDATE_USER_INFO_FAILED" };
  }
};

const getUserInfo = async (userId) => {
  return await userDao.getUserInfo(userId);
};

module.exports = {
  updateUserInfo,
  signIn,
  getUserInfo,
};
