import { createSlice } from "@reduxjs/toolkit";

const intialMessagesState = {
    chats: null,
    sidebarScreen: 1,
    selectedChat: null,
    messages: {},
    currMessages: 0
};

export const messagesSlice = createSlice({
    name: "messages",
    initialState: intialMessagesState,
    reducers: {
        setChats(state, action) {
            state.chats = action.payload;
        },
        unshiftChats(state, action) {
            state.chats.unshift(action.payload);
        },
        removeChat(state, action) {
            state.chats = state.chats.filter((i) => i.chatId != action.payload);
        },
        removeMsg(state, action) {
            const { chatId, msgId } = action.payload;
            const chat = state.chats.find((i) => i.chatId === chatId)
            chat.chatHistory = chat.chatHistory.filter((i) => i.msgId != msgId);
        },
        setSidebarScreen(state, action) {
            state.sidebarScreen = action.payload;
        },
        setSelectedChat(state, action) {
            state.selectedChat = action.payload;
        },
        addMessageInChat(state, action) {
            if (state.chats != null) {
                state.chats.find((i) => i.chatId === action.payload.chatId)?.chatHistory.push(action.payload.message);
            }
        },
        msgSentSuccessfully(state, action) {
            const { chatId, msgId, time } = action.payload;
            state.chats.find((i) => i.chatId === chatId).chatHistory.find((i) => i.msgId === msgId).msgDate = time;
        },
        msgSentUnsuccessfully(state, action) {
            const { chatId, msgId } = action.payload;
            state.chats.find((i) => i.chatId === chatId).chatHistory.find((i) => i.msgId === msgId).msgDate = false;
        },
        overwriteChat(state, action) {
            const chat = action.payload;
            const chatInd = state.chats.findIndex((i) => i.chatId === chat.chatId)
            if (chatInd > -1) {
                state.chats[chatInd] = chat;
            }
        },
        addMessage(state, action) {
            const { chatId, no } = action.payload;
            console.log(chatId, no);
            if (state.messages[chatId] && state.selectedChat != chatId) {
                state.messages[chatId] += no;
            } else if (state.selectedChat != chatId) {
                state.messages[chatId] = no;
            } else {
                state.currMessages += no;
            }
        },
        removeMessage(state, action) {
            if (state.messages[action.payload] != undefined) {
                delete state.messages[action.payload];
            }
        },
        clearChat(state, action) {
            const chatId = action.payload;
            const chat = state.chats.find((i) => i.chatId === chatId);
            chat.chatHistory = chat.chatHistory.filter((i) => i.msgType != 'msg-text');
        },
        blockChat(state, action) {
            const { userId, chatId } = action.payload;
            const chat = state.chats.find((i) => i.chatId === chatId);
            chat.members.find((i) => i.user.userId === userId).blocked = true;
        },
        unblockChat(state, action) {
            const { chatId, userId } = action.payload;
            const chat = state.chats.find((i) => i.chatId === chatId);
            chat.members.find((i) => i.user.userId === userId).blocked = false;
        },
        setMessages(state, action) {
            state.messages = action.payload;
        },
        removeCurrMessages(state, action) {
            state.currMessages = 0;
        },
        clearAll(state, action) {
            state.chats = null;
            state.sidebarScreen = 1;
            state.selectedChat = null;
            state.currMessages = 0;

        },
        clearMessageFeature(state, action) {
            state.chats = null;
            state.sidebarScreen = 1;
            state.selectedChat = null;
            state.messages = {};
            state.currMessages = 0;
        }
    },
});
