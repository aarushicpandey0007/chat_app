// src/components/Login.js
import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/chatSlice';

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
            label="Username"
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
        <div className="links">
          <a href="#" onClick={onSignupToggle}>Signup</a>
          <a href="#">Forgot Password</a>
        </div>
        <div className="inputBox">
          <Button type="submit" variant="contained" color="primary">Login</Button>
        </div>
      </form>
    </Box>
  );
};

export default Login;

