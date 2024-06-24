// 'use client'
// import { myComment } from '@/app/types'
// import { RootState } from '../store'
// import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'

// type CommentState = {
//     commentList: myComment[]
//     loading: boolean
//     tempQuestion: string
// }

// const initialState: CommentState = {
//     commentList: [],
//     loading: false,
//     tempQuestion: '',
// }

// export const commentSlice = createSlice({
//     name: 'comment',
//     initialState,
//     reducers: {
//         reset: () => initialState,
//         setComment: (state, action: PayloadAction<myComment>) => {
//             state.commentList.push(action.payload)
//         },
//         setLoading: (state, action: PayloadAction<boolean>) => {
//             state.loading == action.payload
//         },
//         setTempQuestion: (state, action: PayloadAction<string>) => {
//             state.tempQuestion == action.payload
//         },
//     },
// })

// export const {
//     reset,
//     setComment,
//     setLoading,
//     setTempQuestion
// } = commentSlice.actions
// const persistConfig = {
//     key: 'comment',
//     storage,
// }
// export const getComment = (state: RootState) => state.comment
// export const getCommentList = (state: RootState) => state.comment.commentList
// export const countCommentList = (state: RootState) => state.comment.commentList.length
// export const getTempQuestion = (state: RootState) => state.comment.tempQuestion
// export const getLoading = (state: RootState) => state.board.loading
// const persistedCommentReducer = persistReducer(persistConfig, commentSlice.reducer)

// export default persistedCommentReducer
