// Import required modules
// const passport = require('passport');
const User = require('../models/User'); // Import the User model

// Middleware to check if the user is authenticated
exports.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: 'Unauthorized' });
};
