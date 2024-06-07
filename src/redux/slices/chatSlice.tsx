'use client'
import { RootState } from '../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

type ChatState = {
  question: string
  aiResponse: string
}

const initialState: ChatState = {
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
    }
  },
})

export const {
  getResponse,
  reset,
} = chatSlice.actions
export const selectResponse = (state: RootState) => state.chat.aiResponse
export default chatSlice.reducer