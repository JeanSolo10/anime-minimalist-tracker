import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSeasonAnimes: [],
  selectedAnimeIndex: 0,
  username: "",
};

export const animesSlice = createSlice({
  name: "animes",
  initialState,
  reducers: {
    setCurrenSeasonAnimes: (state, action) => {
      state.currentSeasonAnimes = action.payload;
    },
    setAnimeSingleViewIndex: (state, action) => {
      state.selectedAnimeIndex = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCurrenSeasonAnimes, setAnimeSingleViewIndex } =
  animesSlice.actions;

export default animesSlice.reducer;
