import { configureStore } from '@reduxjs/toolkit'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'
import persistedChatReducer from './slices/chatSlice'
import persistedBoardReducer from './slices/boardSlice'

export const store = configureStore({
    reducer: {
        chat: persistedChatReducer,
        board: persistedBoardReducer
    },
    //   devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch