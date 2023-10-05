import React, { useState } from 'react';
import axios from 'axios';

function SendSATS() {
  const [formData, setFormData] = useState({
    recipient: '',
    amount: 0,
    network: 'bitcoin', // Default to Bitcoin; you can provide options for network selection
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Implement API request to send SATS via Bitcoin or Lightning
      const response = await axios.post(`/api/send-${formData.network}`, formData);

      // Handle successful transaction (e.g., display success message)
      console.log('Transaction successful', response.data);
    } catch (error) {
      // Handle transaction error (e.g., display error message)
      console.error('Transaction error', error.response.data);
    }
  };

  return (
    <div>
      <h2>Send SATS</h2>
      <form onSubmit={handleSubmit}>
        {/* Recipient address input */}
        <input
          type="text"
          name="recipient"
          placeholder="Recipient Address"
          value={formData.recipient}
          onChange={handleChange}
        />

        {/* Amount input */}
        <input
          type="number"
          name="amount"
          placeholder="Amount (SATS)"
          value={formData.amount}
          onChange={handleChange}
        />

        {/* Network selection (Bitcoin or Lightning) */}
        <select name="network" onChange={handleChange} value={formData.network}>
          <option value="bitcoin">Bitcoin</option>
          <option value="lightning">Lightning Network</option>
        </select>

        <button type="submit">Send SATS</button>
      </form>
    </div>
  );
}

export default SendSATS;
