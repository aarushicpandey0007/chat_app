// src/components/Login.js

import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/chatSlice';
import '../styles/LoginSignup.css'; // Import your styles here

const Login = ({ onLogin, onSignupToggle }) => {
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target[0].value; // Capture username
    dispatch(setUser(username)); // Dispatch username to Redux store
    onLogin(); // Invoke parent login handler to change login state
  };

  return (
    <Box className="container">
      <Typography variant="h4" color="#1D2951" textAlign="center" marginBottom="20px">
        Sign In
      </Typography>
      <form onSubmit={handleLogin} className="form" id="signinForm">
        <div className="inputBox">
          <TextField
            type="text"
            required
            
            variant="outlined"
            fullWidth
            className="input-field" // Apply common class here
            placeholder="Enter your username" // Placeholder text
          />
        </div>
        <div className="inputBox">
          <TextField
            type="password"
            required
            
            variant="outlined"
            fullWidth
            className="input-field" // Apply common class here
            placeholder="Enter your password" // Placeholder text
          />
        </div>
        <div className="links">
          <a href="#" onClick={onSignupToggle}>Signup</a>
          <Button 
            color="primary" 
            variant="text" 
            size="small"
            style={{ textTransform: 'none', fontSize: '0.9em' }}
          >
            Forgot Password
          </Button>
        </div>
        <div className="inputBox">
          <button type="submit" className="button">Login</button>
        </div>
      </form>
    </Box>
  );
};

export default Login;

