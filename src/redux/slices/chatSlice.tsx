'use client'
import { RootState } from '../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

type ChatState = {
  messageList: ChatMessage[]
}

interface ChatMessage {
  speaker: 'human' | 'ai'
  content: string
}

const initialState: ChatState = {
  messageList: [],
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    reset: () => initialState,
    addMessageToList: (state, action: PayloadAction<ChatMessage>) => {
      state.messageList.push(action.payload)
    },
  },
})

export const {
  reset,
  addMessageToList
} = chatSlice.actions
const persistConfig = {
  key: 'chat',
  storage,
}
export const getChatState = (state: RootState) => state.chat
export const getMessageList = (state: RootState) => state.chat.messageList
const persistedChatReducer = persistReducer(persistConfig, chatSlice.reducer)

export default persistedChatReducer
