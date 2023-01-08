const User = require('../models/user');
const bcrypt = require('bcryptjs');

async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    // Check if user with given email or username already exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).send({ error: 'User with given email or username already exists' });
    }

    // Create new user
    const user = new User({ username, email, password });
    user.password = await bcrypt.hash(user.password, 10);
    await user.save();

    return res.send({ user });
  } catch (error) {
    return res.status(500).send({ error: 'Error registering user' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Check if user with given email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = user.generateAuthToken();

    return res.send({ user, token });
  } catch (error) {
    return res.status(500).send({ error: 'Error logging in user' });
  }
}

module.exports = {
  register,
  login
};
