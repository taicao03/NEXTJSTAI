import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: {
      allUsers: null, // Thông tin USER
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getUserStart: (state) => {
      state.users.isFetching = true;
    },
    getUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.users.allUsers = action.payload;
      state.users.error = false;
    },
    getUserFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    deleteUserStart: (state) => {
      state.users.isFetching = true;
    },
    deleteUserSuccess: (state, action) => {
      state.users.isFetching = false;
      state.allUsers.filter((arrow) => arrow._id !== action.payload);
    },
    deleteUserFailed: (state) => {
      state.users.isFetching = false;
      state.users.error = true;
    },
    //
  },
});

export const {
  getUserStart,
  getUserSuccess,
  getUserFailed,
  deleteUserFailed,
  deleteUserSuccess,
  deleteUserStart,
} = userSlice.actions;

export default userSlice.reducer;
