const User = require('../models/user');
const { generateToken, refreshToken } = require('../utils/auth');

const register = async (username, email, password) => {
  try {
    const user = new User({
      username,
      email,
      password
    });
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) {
      throw new Error('Email not found');
    }
    const isValid = await user.isValidPassword(password);
    if (!isValid) {
      throw new Error('Invalid password');
    }
    const token = generateToken(user);
    return { user, token };
  } catch (error) {
    throw error;
  }
};

const refresh = async (token) => {
  try {
    const newToken = refreshToken(token);
    return newToken;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  register,
  login,
  refresh
};
