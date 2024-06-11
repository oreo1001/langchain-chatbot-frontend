'use client'
import { Board } from '@/app/types'
import { RootState } from '../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

type BoardState = {
    boardList: Board[]
}

const initialState: BoardState = {
    boardList: [],
}

export const boardSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        reset: () => initialState,
        uploadBoard: (state, action: PayloadAction<Board>) => {
            state.boardList.push(action.payload)
        },
    },
})

export const {
    reset,
    uploadBoard
} = boardSlice.actions
const persistConfig = {
    key: 'chat',
    storage,
}
export const getBoard = (state: RootState) => state.board
export const getBoardList = (state: RootState) => state.board.boardList
const persistedBoardReducer = persistReducer(persistConfig, boardSlice.reducer)

export default persistedBoardReducer
