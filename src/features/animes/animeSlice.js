import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentSeasonAnimes: [],
  selectedAnimeIndex: 0,
  animeInUserWatchList: {},
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
    setAnimeInUserWatchList: (state, action) => {
      state.animeInUserWatchList[action.payload] = false;
    },
    updateAnimeInUserWatchList: (state, action) => {
      state.animeInUserWatchList[action.payload] =
        !state.animeInUserWatchList[action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCurrenSeasonAnimes,
  setAnimeSingleViewIndex,
  setAnimeInUserWatchList,
  updateAnimeInUserWatchList,
} = animesSlice.actions;

export default animesSlice.reducer;
