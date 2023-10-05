// Define user-related controller functions here
const User = require('../models/User'); // Import the User model
const bitcoin = require("bitcoin-core"); // Import the Bitcoin library
const lnService = require("ln-service"); // Import the Lightning Network library

// Configure Bitcoin client
const bitcoinClient = new bitcoin({
  network: "testnet",
  // Add your Bitcoin RPC credentials here
  // username: 'your-username',
  // password: 'your-password',
});

// Configure Lightning Network daemon
const lnd = lnService.lightningDaemon();

// Example: Get user addresses (Bitcoin and Lightning)
exports.getUserAddresses = async (req, res) => {
    try {
      const userId = req.user.id; // Assuming you have user authentication in place
  
      // Generate a new Bitcoin address for the user
      const bitcoinAddress = await bitcoinClient.getNewAddress(userId);
  
      // Generate a new Lightning Network invoice for the user
      const invoice = await lnService.createInvoice({ lnd, tokens: 10000 }); // Adjust the amount as needed
  
      // Save these addresses and invoice in the user's profile in your database
      // Update the user's document in the database with the addresses and invoice
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { bitcoinAddress: bitcoinAddress, lightningInvoice: invoice.payment_request },
        { new: true }
      );
  
      res.json({ bitcoinAddress: updatedUser.bitcoinAddress, lightningInvoice: updatedUser.lightningInvoice });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching user addresses' });
    }
  };

// Example: Get user profile
exports.getUserProfile = (req, res) => {
  try {
    const user = req.user; // Assuming you have user authentication in place

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    return res.json({ user: user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Example: Update user profile
exports.updateUserProfile = (req, res) => {
  try {
    const user = req.user; // Assuming you have user authentication in place

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Update user profile data in the database
    // You can use req.body to access data sent by the client
    // Example: user.name = req.body.name;

    // Save the updated user data
    // user.save((err) => {
    //   if (err) {
    //     console.error(err);
    //     return res.status(500).json({ error: 'Internal Server Error' });
    //   }
    //   return res.json({ message: 'Profile updated successfully' });
    // });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Add more user-related controller functions as needed
