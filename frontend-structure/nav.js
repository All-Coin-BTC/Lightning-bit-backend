import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using React Router

function Nav({ isAuthenticated, username, bitcoinAddress, lightningAddress, bitcoinBalance, lightningBalance, onLogout }) {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          {isAuthenticated ? (
            <>
              <div>Welcome, {username}</div>
              <div>Bitcoin Address: {bitcoinAddress}</div>
              <div>Lightning Address: {lightningAddress}</div>
              <div>Balance (SATS): {bitcoinBalance}</div>
              <div>Balance (USD): {lightningBalance}</div>
              <button onClick={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
