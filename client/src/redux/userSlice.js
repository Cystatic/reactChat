import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: JSON.parse(localStorage.getItem("user")) || null,
    pending: null,
    error: null,
  },
  reducers: {
    actionStart: (state) => {
      state.pending = true;
    },
    actionFailure: (state) => {
      state.pending = false;
      state.error = true;
    },
    loginSuccess: (state, action) => {
      state.pending = false;
      state.userInfo = action.payload;
    },
    logoutSuccess: (state) => {
      state.userInfo = null
    },
    follow:(state,action) => {
      state.userInfo.followings = [...state.userInfo.followings,action.payload]
    },
    unfollow:(state,action) => {
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          followings: state.userInfo.followings.filter(
            (following) => following !== action.payload
          )
        },
      };
    },
    joinedGroup:(state,action) => {
      state.userInfo.joinedGroups = [...state.userInfo.joinedGroups,action.payload]
    }
  }, 
  
  
});

export const { actionStart, loginSuccess, actionFailure ,logoutSuccess,follow,unfollow,joinedGroup} = userSlice.actions;

export default userSlice.reducer;