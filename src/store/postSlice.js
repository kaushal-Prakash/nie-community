import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  post:null,
}

export const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    updatePost: (state,action)=>{
      state.post = action.payload;
    },
    deletePost: (state)=>{
      state.post = null;
    }
  },
})

export const {updatePost,deletePost } = postSlice.actions

export default postSlice.reducer