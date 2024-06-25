'use client'
import { Board, myComment } from '@/app/types'
import { RootState } from '../store'
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

type BoardState = {
    boardList: Board[]
    loading: boolean
    tempQuestion: string
}

const initialState: BoardState = {
    boardList: [],
    loading: false,
    tempQuestion: '',
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
        addComment: (state, action: PayloadAction<{ boardId: number; comment: myComment }>) => {
            const { boardId, comment } = action.payload;
            const board = state.boardList.find(board => board.id === boardId);
            if (board) {
                board.commentList.push(comment);
            }
        },
        setTempQuestion: (state, action: PayloadAction<string>) => {
            state.tempQuestion = action.payload
        }
    },
})

export const {
    reset,
    uploadBoard,
    setLoading,
    addComment,
    setTempQuestion,
} = boardSlice.actions
const persistConfig = {
    key: 'board',
    storage,
}
export const makeGetBoardById = () =>      //메모이제이션으로 selector만들기
    createSelector(
        [getBoardList, (state: RootState, id: number) => id],
        (boardList, id) => boardList.find(board => board.id === id)
    );
// export const getBoard = (state: RootState, id: number) => {
//     return state.board.boardList.find(board => board.id === id);
// };
export const getBoardList = (state: RootState) => state.board.boardList
export const countBoardList = (state: RootState) => state.board.boardList.length
export const getLoading = (state: RootState) => state.board.loading
export const getTempQuestion = (state: RootState) => state.board.tempQuestion
const persistedBoardReducer = persistReducer(persistConfig, boardSlice.reducer)

export default persistedBoardReducer
