import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSeasonAnimes: [],
};

export const animesSlice = createSlice({
  name: "animes",
  initialState,
  reducers: {
    setCurrenSeasonAnimes: (state, action) => {
      state.currentSeasonAnimes = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrenSeasonAnimes } = animesSlice.actions;

export default animesSlice.reducer;
