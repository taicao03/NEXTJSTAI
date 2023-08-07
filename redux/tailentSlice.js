import { createSlice } from "@reduxjs/toolkit";

const talentSlice = createSlice({
  name: "talent",
  initialState: {
    talents: {
      talent: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    //GET SHOP
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
  },
});

export const { getTalentStart, getTalentSuccess, getTalentFailed } =
  talentSlice.actions;

export default talentSlice.reducer;
