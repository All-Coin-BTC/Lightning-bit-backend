import React, { useState } from 'react';
import QRCode from 'react-qr-code';

function ReceiveSATS() {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [network, setNetwork] = useState('bitcoin'); // Default to Bitcoin
  const [showQRCode, setShowQRCode] = useState(false);

  const handleToggleNetwork = () => {
    // Toggle between Bitcoin and Lightning Network
    const newNetwork = network === 'bitcoin' ? 'lightning' : 'bitcoin';
    setNetwork(newNetwork);
    setShowQRCode(false); // Hide QR code when toggling
  };

  const handleGenerateQRCode = () => {
    // Generate a QR code for the recipient address
    // You can add logic here to fetch the user's address based on the selected network
    const address = ''; // Replace with the recipient's address
    setRecipientAddress(address);
    setShowQRCode(true);
  };

  const handleShareQRCode = () => {
    // Convert the QR code to an image and allow the user to share it
    // You can use external libraries or services to handle image conversion
    // Here, we'll simply alert the address for demonstration purposes
    alert(`Share this QR code:\n${recipientAddress}`);
  };

  return (
    <div>
      <h2>Receive SATS</h2>

      {/* Toggle between Bitcoin and Lightning Network */}
      <button onClick={handleToggleNetwork}>
        {network === 'bitcoin' ? 'Switch to Lightning' : 'Switch to Bitcoin'}
      </button>

      {/* Generate QR code button */}
      <button onClick={handleGenerateQRCode}>Generate QR Code</button>

      {/* Share QR code button */}
      {showQRCode && (
        <button onClick={handleShareQRCode}>Share QR Code</button>
      )}

      {/* Display the QR code */}
      {showQRCode && (
        <div>
          <h3>Recipient Address:</h3>
          <p>{recipientAddress}</p>
          <QRCode value={recipientAddress} />
        </div>
      )}
    </div>
  );
}

export default ReceiveSATS;
