import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List, ListItem, ListItemText, Paper, Badge, Typography } from '@mui/material';
import { setCurrentConversation } from '../store/chatSlice';

const ChatList = () => {
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.chat.conversations);
  const currentConversation = useSelector((state) => state.chat.currentConversation);

  const handleConversationClick = (conversationId) => {
    dispatch(setCurrentConversation(conversationId));
  };

  return (
    <Paper elevation={3} sx={{ height: '100%', overflowY: 'auto' }}>
      <Typography variant="h5" sx={{ padding: '1rem' }}>
        Contacts
      </Typography>
      <List>
        {Object.keys(conversations).map((conversationId) => {
          const conversation = conversations[conversationId];
          const lastMessage = conversation.messages[conversation.messages.length - 1];
          const unreadCount = conversation.messages.length;  // Simulate unread messages count

          return (
            <ListItem
              key={conversationId}
              button
              selected={conversationId === currentConversation}
              onClick={() => handleConversationClick(conversationId)}
            >
              <Badge badgeContent={unreadCount} color="primary" sx={{ marginRight: '1rem' }}>
                <div className={`pic ${conversationId.toLowerCase().split(' ').join('')}`} style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundSize: 'cover', backgroundPosition: 'center' }} />
              </Badge>
              <ListItemText
                primary={conversationId}
                secondary={lastMessage ? lastMessage.text : 'No messages yet'}
              />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );
};

export default ChatList;
