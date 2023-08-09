import { createSlice } from "@reduxjs/toolkit";

const talentSlice = createSlice({
  name: "talent",
  initialState: {
    talents: {
      talent: null,
      isFetching: false,
      error: false,
    },
    history: {
      data: null,
      isFetching: false,
      error: false,
    },
    bet: {  
      data: null,
      isFetching: false,
      error: false,
    }
   
  },
  reducers: {
    getTalentStart: (state) => {
      state.talents.isFetching = true;
    },
    getTalentSuccess: (state, action) => {
      state.talents.isFetching = false;
      state.talents.talent = action.payload;
      state.talents.error = false;
    },
    getTalentFailed: (state) => {
      state.talents.isFetching = false;
      state.talents.error = true;
    },
    getHistoryStart: (state) => {
      state.history.isFetching = true;
    },
    getHistorySuccess: (state, action) => {
      state.history.isFetching = false;
      state.history.data = action.payload;
      state.history.error = false;
    },
    getHistoryFailed: (state) => {
      state.history.isFetching = false;
      state.history.error = true;
    },
    betTalentStart : (state) => {
      state.bet.isFetching = true;
      
    },
    betTalentSuccess : (state,action) => { 
      console.log(action.payload);
      state.bet.isFetching = false;
      state.bet.data = action.payload;
      state.bet.error = false;
    },
    betTalentFailed : (state) => { 
      state.bet.isFetching = false;
      state.bet.error = true;
    }
  },
});

export const {
  getTalentStart,
  getTalentSuccess,
  getTalentFailed,
  getHistoryStart,
  getHistorySuccess,
  getHistoryFailed,
  betTalentStart,
  betTalentSuccess,
  betTalentFailed
} = talentSlice.actions;

export default talentSlice.reducer;
