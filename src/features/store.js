import { configureStore } from "@reduxjs/toolkit";
import animesReducer from "../features/animes/animeSlice";

export const store = configureStore({
  reducer: {
    animes: animesReducer,
  },
});
