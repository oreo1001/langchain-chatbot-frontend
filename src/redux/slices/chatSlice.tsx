'use client'
import { RootState } from '../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

type ChatState = {
  question: string
  aiResponse: string
  messageList: string[]
}

// interface AIMessage {
//   speaker: string,
//   content: string
// }

const initialState: ChatState = {
  messageList: [],
  question: '',
  aiResponse: ''
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    reset: () => initialState,
    getResponse: (state, action: PayloadAction<string>) => {
      state.aiResponse = action.payload
    },
    addMessageToList: (state, action: PayloadAction<string>) => {
      state.messageList.push(action.payload)
    }
  },
})

export const {
  getResponse,
  reset,
  addMessageToList,
} = chatSlice.actions
const persistConfig = {
  key: 'chat',
  storage,
}
export const getChatState = (state: RootState) => state.chat
export const getMessageList = (state: RootState) => state.chat.messageList
const persistedChatReducer = persistReducer(persistConfig, chatSlice.reducer)

export default persistedChatReducer
