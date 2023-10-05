const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController'); // Import the auth controller


const router = express.Router();

// Register a new user
router.post('/register', authController.registerUser);

// Log in a user
router.post('/login', authController.loginUser);

// Log out a user
router.get('/logout', authController.logoutUser);

module.exports = router;
