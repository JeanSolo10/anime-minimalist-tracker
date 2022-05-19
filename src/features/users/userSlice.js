import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: "",
};

export const usersSlice = createSlice({
  name: "username",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload;
    },
    removeUserName: (state) => {
      state.username = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserName, removeUserName } = usersSlice.actions;

export default usersSlice.reducer;
