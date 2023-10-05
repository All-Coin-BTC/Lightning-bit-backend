// Example authorization middleware to check if a user has permission for a specific action

// Import any necessary models or modules

// Middleware to check if the user has permission to perform a specific action
exports.hasPermission = (req, res, next) => {
    // Check if the user has the required permission based on your application's logic
    // For example, you can check the user's role or specific permissions in the database
    if (req.user && req.user.hasPermission) { // Modify this condition as per your requirements
      return next();
    }
    res.status(403).json({ error: 'Forbidden' }); // User does not have permission
  };
  