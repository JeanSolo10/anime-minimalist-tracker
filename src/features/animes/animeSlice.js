import { createSlice } from "@reduxjs/toolkit";
import getSeason from "../../utils/getSeason";
import getLastSeason from "../../utils/getLastSeason";
import getNextSeason from "../../utils/getNextSeason";

const initialState = {
  currentSeasonAnimes: [],
  nextSeasonAnimes: [],
  lastSeasonAnimes: [],
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
    setLastSeasonAnimes: (state, action) => {
      state.lastSeasonAnimes = action.payload;
    },
    setSelectedSeason: (state, action) => {
      const currSeason = getSeason(new Date().getMonth() + 1);
      const nextSeason = getNextSeason(currSeason);
      if (action.payload.toLowerCase() === currSeason.toLowerCase()) {
        state.seasonSelected = state.currentSeasonAnimes;
      } else if (action.payload.toLowerCase() === nextSeason.toLowerCase()) {
        state.seasonSelected = state.nextSeasonAnimes;
      } else {
        state.seasonSelected = state.lastSeasonAnimes;
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
  setLastSeasonAnimes,
} = animesSlice.actions;

export default animesSlice.reducer;
