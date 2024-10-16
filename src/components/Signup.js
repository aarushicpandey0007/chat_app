// src/components/Signup.js

import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

const Signup = ({ onSignup }) => {
  const handleSignup = (e) => {
    e.preventDefault();
    // Implement signup logic here
    console.log('Signing up');
    onSignup(); // Call the parent function to handle signup
  };

  return (
    <Box className="container">
      <Typography variant="h4" color="#1D2951" textAlign="center" marginBottom="20px">Sign Up</Typography>
      <form onSubmit={handleSignup} className="form" id="signupForm">
        <div className="inputBox">
          <TextField
            type="text"
            required
            label="Username"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="inputBox">
          <TextField
            type="email"
            required
            label="Email"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="inputBox">
          <TextField
            type="password"
            required
            label="Password"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="inputBox">
          <TextField
            type="password"
            required
            label="Confirm Password"
            variant="outlined"
            fullWidth
          />
        </div>
        <div className="links">
          <a href="#" onClick={onSignup}>Signin</a>
        </div>
        <div className="inputBox">
          <Button type="submit" variant="contained" color="primary">Sign Up</Button>
        </div>
      </form>
    </Box>
  );
};

export default Signup;
