'use client'
import { Board } from '@/app/types'
import { RootState } from '../store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

type BoardState = {
    boardList: Board[]
    loading: boolean
}

const initialState: BoardState = {
    boardList: [],
    loading: false,
}

export const boardSlice = createSlice({
    name: 'board',
    initialState,
    reducers: {
        reset: () => initialState,
        uploadBoard: (state, action: PayloadAction<Board>) => {
            state.boardList.push(action.payload)
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading == action.payload
        },
    },
})

export const {
    reset,
    uploadBoard,
    setLoading,
} = boardSlice.actions
const persistConfig = {
    key: 'board',
    storage,
}
export const getBoard = (state: RootState) => state.board
export const getBoardList = (state: RootState) => state.board.boardList
export const countBoardList = (state: RootState) => state.board.boardList.length
export const getLoading = (state: RootState) => state.board.loading
const persistedBoardReducer = persistReducer(persistConfig, boardSlice.reducer)

export default persistedBoardReducer
