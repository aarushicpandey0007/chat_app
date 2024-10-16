import React, { useEffect, useRef, useState } from 'react'; // Import useState
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, receiveMessage, setCurrentConversation } from '../store/chatSlice'; // Import necessary actions
import { Container, TextField, Button, Paper, Typography, Box, List, ListItem, Avatar } from '@mui/material';
import '../styles/chatStyles.scss'; // Make sure your SCSS is imported

const Chat = () => {
  const dispatch = useDispatch();
  const currentConversationId = useSelector((state) => state.chat.currentConversation); // Get current conversation ID
  const currentUser = useSelector((state) => state.chat.user); // Get logged-in user
  const conversations = useSelector((state) => state.chat.conversations); // Get all conversations
  const conversation = conversations[currentConversationId]; // Get the current conversation's data
  const messages = conversation?.messages || []; // Get messages for the current conversation
  const [inputValue, setInputValue] = React.useState('');
  const messageEndRef = useRef(null);
  const [animate, setAnimate] = useState(false); // State for animation

  // Scroll to the last message when the messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Trigger the animation when the component mounts
  useEffect(() => {
    setAnimate(true); // Start the animation
  }, []);

  // Handle sending a message
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return; // Don't send if input is empty

    // Dispatch sendMessage action to add message to conversation
    dispatch(
      sendMessage({
        conversationId: currentConversationId,
        text: inputValue,
        user: currentUser, // User who is sending the message
      })
    );

    // Simulate a bot response after a delay
    setTimeout(() => {
      dispatch(
        receiveMessage({
          conversationId: currentConversationId,
          text: 'This is a simulated bot reply.', // Bot reply text
        })
      );
    }, 1000);

    setInputValue(''); // Clear the input after sending the message
  };

  // Handle switching conversations
  const handleConversationClick = (conversationId) => {
    dispatch(setCurrentConversation(conversationId)); // Switch the current conversation
  };

  return (
    <Container 
      className="chat-container" 
      maxWidth={false} // Disable default maxWidth behavior
      sx={{ display: 'flex', height: '100vh', width: '210vh', margin: '0 auto' }} // Set to 95% width of viewport
    >
      {/* Sidebar with conversation list */}
      <Box className="sidebar" sx={{ width: '1300px', borderRight: '1px solid #ccc', overflowY: 'auto', p: 2 }}>
        <Typography variant="h5" sx={{ marginBottom: '16px' }}>Conversations</Typography>
        
        {/* Animated container for conversations list */}
        <Box
          className={animate ? 'animate' : ''} // Apply animation class if animate is true
          sx={{
            width: '590px',
            borderRight: '1px solid #ccc',
            overflowY: 'auto',
            p: 2,
            backgroundColor: '#1D2951', // Set sidebar background color
            color: 'white', // Set text color to white
            border: '2px solid #007bff', // Add a sparkling blue border
            height: '89vh',
            margin: '10px', // Space around the sidebar
            borderRadius: '8px', // Rounded border
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <List>
            {Object.keys(conversations).map((conversationId) => {
              const conversation = conversations[conversationId];
              return (
                <ListItem
                  key={conversationId}
                  button
                  onClick={() => handleConversationClick(conversationId)}
                  selected={conversationId === currentConversationId} // Highlight the selected conversation
                  sx={{ display: 'flex', alignItems: 'center', padding: '10px' }}
                >
                  <Avatar src={conversation.avatar} alt={conversationId} sx={{ marginRight: '10px' }} />
                  <Typography variant="body1">{conversationId}</Typography>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>

      {/* Chat Window */}
      <Paper className="chat" elevation={3} sx={{ padding: 2, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Contact Bar */}
        <Box className="contact-bar" sx={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Avatar src={conversation?.avatar} alt={currentConversationId} sx={{ marginRight: '10px' }} />
          <Typography variant="h6">{currentConversationId}</Typography>
        </Box>

        {/* Messages Section */}
        <Box className="messages" sx={{ flexGrow: 1, overflowY: 'auto' }}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              className={`message ${msg.user === currentUser ? 'parker' : ''}`}
              sx={{
                display: 'flex',
                justifyContent: msg.user === currentUser ? 'flex-end' : 'flex-start',
                marginBottom: '10px',
              }}
            >
              <Box
                sx={{
                  margin: '10px',
                  padding: '10px',
                  borderRadius: 4,
                  backgroundColor: msg.user === currentUser ? '#78e08f' : '#fff',
                  color: msg.user === currentUser ? '#fff' : '#000',
                  boxShadow: '0 0 5px rgba(0, 0, 0, 0.2)',
                }}
              >
                <Typography>{msg.text}</Typography>
                <Typography variant="caption" className="time">
                  {msg.timestamp}
                </Typography>
              </Box>
            </Box>
          ))}
          <div ref={messageEndRef} />
        </Box>

        {/* Input Box */}
        <Box className="input" sx={{ display: 'flex', mt: 2 }}>
          <TextField
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            fullWidth
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleSendMessage} sx={{ marginLeft: 1 }}>
            Send
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Chat;
