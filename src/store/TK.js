import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "kenny",
};

const nameSlice = createSlice({
  name: "name",
  initialState,
  reducers: {
    stamAction(state) {
      state.name = state.name + ".";
    },
  },
});

export const nameActions = nameSlice.actions;

export default nameSlice.reducer;
