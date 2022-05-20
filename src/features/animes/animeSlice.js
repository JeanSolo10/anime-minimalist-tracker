import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSeasonAnimes: [],
  nextSeasonAnimes: [],
  selectedAnimeIndex: 0,
  username: "",
  seasonSelected: [],
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
    setNextSeasonAnimes: (state, action) => {
      state.nextSeasonAnimes = action.payload;
    },
    setSelectedSeason: (state, action) => {
      if (action.payload.toLowerCase() === "spring") {
        state.seasonSelected = state.currentSeasonAnimes;
      }
      if (action.payload.toLowerCase() === "summer") {
        state.seasonSelected = state.nextSeasonAnimes;
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrenSeasonAnimes,
  setAnimeSingleViewIndex,
  setNextSeasonAnimes,
  setSelectedSeason,
} = animesSlice.actions;

export default animesSlice.reducer;
