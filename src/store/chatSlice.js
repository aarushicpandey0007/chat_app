import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // Add user state to track the logged-in user
  conversations: {
    'Steve Rogers': {
      messages: [
        { id: 1, text: "That is America's ass 🇺🇸🍑", user: 'Steve Rogers', timestamp: '11:30 AM' }
      ],
      avatar: 'https://example.com/steve_avatar.jpg' // Add avatar URL
    },
    'Tony Stark': {
      messages: [
        { id: 2, text: "Uh, he's from space, he came here to steal a necklace from a wizard.", user: 'Tony Stark', timestamp: '12:56 PM' }
      ],
      avatar: 'https://example.com/tony_avatar.jpg' // Add avatar URL
    },
    'Bruce Banner': {
      messages: [
        { id: 3, text: "There's an Ant-Man *and* a Spider-Man?", user: 'Bruce Banner', timestamp: '10:00 AM' }
      ],
      avatar: 'https://example.com/bruce_avatar.jpg' // Add avatar URL
    },
    'Thor Odinson': {
      messages: [
        { id: 4, text: "I like this one", user: 'Thor Odinson', timestamp: '9:45 AM' }
      ],
      avatar: 'https://example.com/thor_avatar.jpg' // Add avatar URL
    },
    'Carol Danvers': {
      messages: [
        { id: 5, text: "Hey Peter Parker, you got something for me?", user: 'Carol Danvers', timestamp: '8:15 AM' }
      ],
      avatar: 'https://example.com/carol_avatar.jpg' // Add avatar URL
    },
  },
  currentConversation: 'Steve Rogers',  // Default conversation to start with
  searchQuery: '',  // State for search query
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Set the current user
    },
    sendMessage: (state, action) => {
      const { conversationId, text, user } = action.payload;
      state.conversations[conversationId].messages.push({
        id: Date.now(),
        text,
        user,
        timestamp: new Date().toLocaleTimeString(),
      });
    },
    receiveMessage: (state, action) => {
      const { conversationId, text } = action.payload;
      state.conversations[conversationId].messages.push({
        id: Date.now(),
        text,
        user: 'Bot',
        timestamp: new Date().toLocaleTimeString(),
      });
    },
    setCurrentConversation: (state, action) => {
      state.currentConversation = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload; // Update the search query state
    },
  },
});

// Selector to filter conversations based on the search query
export const selectFilteredConversations = (state) => {
  const { conversations, searchQuery } = state.chat;
  if (!searchQuery) return conversations; // Return all if no search query
  return Object.keys(conversations)
    .filter((name) => name.toLowerCase().includes(searchQuery.toLowerCase()))
    .reduce((acc, name) => {
      acc[name] = conversations[name];
      return acc;
    }, {});
};

export const { setUser, sendMessage, receiveMessage, setCurrentConversation, setSearchQuery } = chatSlice.actions;
export default chatSlice.reducer;
