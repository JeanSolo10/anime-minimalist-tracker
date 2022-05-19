import { configureStore } from "@reduxjs/toolkit";
import animesReducer from "../features/animes/animeSlice";
import usersRouter from "../features/users/userSlice";

export const store = configureStore({
  reducer: {
    animes: animesReducer,
    users: usersRouter,
  },
});
