const User = require('../models/user');

const getUserById = async (userId) => {
  try {
    const user = await User.findById(userId).lean();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).lean();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, update) => {
  try {
    const user = await User.findByIdAndUpdate(userId, update, { new: true }).lean();
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getUserById,
  getUserByEmail,
  updateUser
};
