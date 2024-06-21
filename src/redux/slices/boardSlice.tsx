'use client'
import { Board, myComment } from '@/app/types'
import { RootState } from '../store'
import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'
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
        addComment: (state, action: PayloadAction<{ boardId: number; comment: myComment }>) => {
            const { boardId, comment } = action.payload;
            const board = state.boardList.find(board => board.id === boardId);
            if (board) {
                board.commentList.push(comment);
            }
        },
    },
})

export const fetchBoardData = createAsyncThunk(
    'board/fetchBoardData',
    async (id: string) => {
        const response = await fetch(`/api/board/${id}`);
        const data = await response.json();
        return { id, data };
    }
);

export const {
    reset,
    uploadBoard,
    setLoading,
    addComment,
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
const persistedBoardReducer = persistReducer(persistConfig, boardSlice.reducer)

export default persistedBoardReducer
