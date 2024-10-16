// src/App.js

import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; // Import React Router
import store from './store/store';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import { Container, Box } from '@mui/material';
import './styles/LoginSignup.css'; // Import the CSS file
import { setCurrentConversation, setSearchQuery } from './store/chatSlice'; // Import actions from chatSlice
import { useDispatch } from 'react-redux'; // Import useDispatch

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <Provider store={store}>
      <Router>
        <Container sx={{ display: 'flex', height: '100vh' }}>
          <Box sx={{ width: '400px', m: 'auto' }}>
            <AppContent 
              isLoggedIn={isLoggedIn} 
              setIsLoggedIn={setIsLoggedIn} 
              showSignup={showSignup} 
              setShowSignup={setShowSignup} 
            />
          </Box>
        </Container>
      </Router>
    </Provider>
  );
};

// New AppContent component for better structure
const AppContent = ({ isLoggedIn, setIsLoggedIn, showSignup, setShowSignup }) => {
  const dispatch = useDispatch(); // Now dispatch is called within the Provider context

  const handleLogin = () => {
    console.log('User logged in');
    setIsLoggedIn(true);

    // Set the initial chat state upon login
    dispatch(setCurrentConversation('Steve Rogers')); // Set default conversation
    dispatch(setSearchQuery('')); // Reset search query if necessary
  };

  const handleSignup = () => {
    console.log('User signed up');
    setShowSignup(false); // Optionally, redirect to login after signup
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          !isLoggedIn ? (
            showSignup ? (
              <Signup onSignup={handleSignup} />
            ) : (
              <Login 
                onLogin={handleLogin} 
                onSignupToggle={() => setShowSignup(true)} 
              />
            )
          ) : (
            <Navigate to="/chat" replace />
          )
        } 
      />
      <Route path="/chat" element={isLoggedIn ? <Chat /> : <Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

