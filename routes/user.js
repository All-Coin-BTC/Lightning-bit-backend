const express = require('express');
const userController = require('../controllers/userController'); // Import the user controller
const authenticationMiddleware = require('../middlewares/authentication'); // Import the authentication middleware

const router = express.Router();

// Example: Get user profile
router.get('/profile', authenticationMiddleware.isAuthenticated, userController.getUserProfile);

// Example: Update user profile
router.put('/profile', authenticationMiddleware.isAuthenticated, userController.updateUserProfile);

// Example: Get user addresses (Bitcoin and Lightning)
router.get('/addresses', authenticationMiddleware.isAuthenticated, userController.getUserAddresses); // Updated route with authentication middleware

// Add more user-related routes as needed

module.exports = router;
