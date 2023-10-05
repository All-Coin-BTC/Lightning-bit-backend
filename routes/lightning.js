const express = require('express');
const bitcoinController = require('../controllers/bitcoinController'); // Import the Bitcoin controller
const lightningController = require('../controllers/lightningController'); // Import the Lightning Network controller


const router = express.Router();

// Example: Get Bitcoin balance
router.get('/balance', bitcoinController.getBitcoinBalance);

// Example: Send SATS via Bitcoin
router.post('/send', bitcoinController.sendBitcoin);

// Add more Bitcoin-related routes as needed
// Example: Get Lightning Network balance
router.get('/balance', lightningController.getLightningBalance);

// Example: Send SATS via Lightning Network
router.post('/send', lightningController.sendLightning);

// Add more Lightning Network-related routes as needed


module.exports = router;
