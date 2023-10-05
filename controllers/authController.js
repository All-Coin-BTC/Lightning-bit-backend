const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User'); // Import your User model

// Register a new user
exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if the email is already in use
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Create a new user
    const newUser = new User({
      username: username,
      email: email,
      password: password,
    });

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;

    await newUser.save();

    // Log in the user after registration
    req.login(newUser, (err) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });

      return res.json({ user: newUser });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Log in a user
exports.loginUser = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return res.status(500).json({ error: 'Internal Server Error' });
    if (!user) return res.status(401).json({ error: info.message });

    req.login(user, (err) => {
      if (err) return res.status(500).json({ error: 'Internal Server Error' });

      return res.json({ user: user });
    });
  })(req, res, next);
};

// Log out a user
exports.logoutUser = (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
};
