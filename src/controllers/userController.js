const User = require('../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  try {
    const { name, username, email, password, role } = req.body;

    if (!name || !username || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: 'Please provide all required fields' });
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ message: 'User with this email already exists' });
    }

    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    res
      .status(201)
      .json({ message: 'User registered successfully', data: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Please provide username and password' });
    }

    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET || 'Cutie',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      data: { token },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const profile = (request, response) => {
  try {
    const user = request.user;
    response.status(200).json({ message: 'User profile', data: user });
  } catch (error) {
    response.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, profile };
