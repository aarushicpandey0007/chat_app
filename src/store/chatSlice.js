import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null, // State to track the logged-in user
    conversations: {
        'Radhika': {
            messages: [
                { id: 1, text: "Hey there!", user: 'Radhika', timestamp: '11:30 AM' },
                { id: 2, text: "Wanna have lunch?", user: 'Radhika', timestamp: '11:31 AM' }
            ],
            avatar: 'https://yohohindi.com/wp-content/uploads/2022/08/26-girls-dp-yohohindi.com_.jpeg'
        },
        'Lakshita': {
            messages: [
                { id: 3, text: "Hi!", user: 'Lakshita', timestamp: '12:56 PM' },
                { id: 4, text: "How's it going?", user: 'Lakshita', timestamp: '12:57 PM' }
            ],
            avatar: 'https://th.bing.com/th/id/R.1a616d03469304f3ee855e44e1037918?rik=pFgQjXyVUHRqoA&riu=http%3a%2f%2fupload.wikimedia.org%2fwikipedia%2fcommons%2f3%2f38%2fFlower_July_2011-2_1_cropped.jpg'
        },
        'Gaurav': {
            messages: [
                { id: 5, text: "What's up?", user: 'Gaurav', timestamp: '10:00 AM' },
                { id: 6, text: "Let's meet up later.", user: 'Gaurav', timestamp: '10:01 AM' }
            ],
            avatar: 'https://th.bing.com/th/id/R.b8d77e6c4af10e8f929fd115dd76b5c7?rik=zW%2fgABqQ4Aw6sg&riu=http%3a%2f%2f4.bp.blogspot.com%2f-hTNshJCaQGw%2fTfZB-fe_2RI%2fAAAAAAAAAFc%2f7LJwgxDNGso%2fs1600%2fHibiscus%2bFlowers%2bWallpaper1.jpg'
        },
        'Chiya': {
            messages: [
                { id: 7, text: "Hey!", user: 'Chiya', timestamp: '9:45 AM' },
                { id: 8, text: "What are you doing today?", user: 'Chiya', timestamp: '9:46 AM' }
            ],
            avatar: 'https://th.bing.com/th/id/R.8eb4719424a7c635efc1a2a507b7e725?rik=bs%2fAtbeyxH34Zg&riu=http%3a%2f%2fwww.customlawn.com%2fwp-content%2fuploads%2f2016%2f09%2fchrysanthemums-mums-fall-plants-custom-lawn-kansas-city.jpg'
        },
        'Shraddha': {
            messages: [
                { id: 9, text: "Hey, are you free?", user: 'Shraddha', timestamp: '8:15 AM' },
                { id: 10, text: "Let's grab coffee!", user: 'Shraddha', timestamp: '8:16 AM' }
            ],
            avatar: 'https://example.com/shraddha_avatar.jpg' // Replace with an appropriate URL if needed
        },
    },
    currentConversation: 'Radhika',  // Default conversation to start with
    searchQuery: '',  // State for search query
    highlightedContact: null, // State for highlighting contact
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
            // Check if conversationId exists
            const conversation = state.conversations[conversationId];
            if (conversation) {
                conversation.messages.push({
                    id: Date.now(),
                    text,
                    user,
                    timestamp: new Date().toLocaleTimeString(),
                });
            } else {
                console.error(`Error: Conversation "${conversationId}" not found.`);
            }
        },
        receiveMessage: (state, action) => {
            const { conversationId, text } = action.payload;
            // Check if conversationId exists
            const conversation = state.conversations[conversationId];
            if (conversation) {
                conversation.messages.push({
                    id: Date.now(),
                    text,
                    user: 'Bot',
                    timestamp: new Date().toLocaleTimeString(),
                });
            } else {
                console.error(`Error: Conversation "${conversationId}" not found.`);
            }
        },
        setCurrentConversation: (state, action) => {
            const previousConversation = state.currentConversation;
            state.currentConversation = action.payload;
            state.highlightedContact = action.payload; // Highlight the contact

            // Set a timeout to reset highlight after 2 seconds
            setTimeout(() => {
                if (state.highlightedContact === action.payload) {
                    state.highlightedContact = null; // Reset highlight after 2 seconds
                }
            }, 2000);
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
