const express = require('express');
const bodyParser = require('body-parser');
const bitcoin = require('bitcoin-core');
const lnService = require('ln-service');
const passport = require('passport');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Configure Bitcoin and Lightning Network connections
const bitcoinClient = new bitcoin({
  network: 'testnet',
  // Add your Bitcoin RPC credentials here
  // username: 'your-username',
  // password: 'your-password',
});

const lnd = lnService.lightningDaemon();

// Route to get user's Bitcoin and Lightning addresses
app.get('/api/addresses', async (req, res) => {
    try {
      const userId = req.user.id; // Assuming you have user authentication in place
      // Generate a new Bitcoin address for the user
      const bitcoinAddress = await bitcoinClient.getNewAddress(userId);
      
      // Generate a new Lightning Network invoice for the user
      const invoice = await lnService.createInvoice({ lnd, tokens: 10000 }); // Adjust the amount as needed
      
      // Save these addresses and invoice in the user's profile in your database
  
      res.json({ bitcoinAddress, lightningInvoice: invoice.payment_request });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error fetching user addresses' });
    }
  });
  

// Route to fetch user balance from Bitcoin and Lightning Network
app.get('/api/balance', async (req, res) => {
  try {
    // Fetch Bitcoin balance using bitcoin-core library
    const bitcoinBalance = await bitcoinClient.getBalance();

    // Fetch Lightning balance using ln-service library
    const lightningBalance = await lnService.getBalance({ lnd });

    res.json({ bitcoinBalance, lightningBalance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching balances' });
  }
});

// Route to send SATS via Lightning Network
app.post('/api/send-lightning', async (req, res) => {
  const { recipient, amount } = req.body;

  try {
    // Generate a Lightning Network invoice using ln-service
    const invoice = await lnService.createInvoice({ lnd, tokens: amount });

    // Implement logic to send the invoice details to the client for payment
    res.json({ invoice });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating Lightning Network invoice' });
  }
});

// Route to send SATS via Bitcoin
app.post('/api/send-bitcoin', async (req, res) => {
  const { recipient, amount } = req.body;

  try {
    // Send SATS via Bitcoin using bitcoin-core library
    const txid = await bitcoinClient.sendToAddress(recipient, amount);
    
    // Implement logic to handle the transaction and response
    res.json({ txid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error sending Bitcoin transaction' });
  }
});


// Periodically check for new Bitcoin transactions
// Monitor Bitcoin Transactions
async function checkBitcoinTransactions() {
    try {
      const userId = 'user-id'; // Replace with the actual user's ID
      const userBitcoinAddress = 'user-specific-bitcoin-address'; // Replace with the user's Bitcoin address
  
      // List transactions associated with the user's Bitcoin address
      const transactions = await bitcoinClient.listTransactions(userId, 10); // Adjust the number of transactions to fetch
      
      // Process the transactions and update the user's balance
      for (const tx of transactions) {
        // Check if the transaction is incoming and confirmations are sufficient
        if (tx.category === 'receive' && tx.confirmations >= 1) {
          // Update the user's balance in your database
          // Deduct fees and add the received amount to the user's balance
        }
      }
    } catch (err) {
      console.error(err);
    }
  }
  
  // Set up a timer to periodically check for new transactions
  setInterval(checkBitcoinTransactions, 60000); // Check every minute (adjust as needed)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


