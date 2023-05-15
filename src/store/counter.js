import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    add1(state) {
      state.counter = state.counter + 1;
    },
    remove1(state) {
      state.counter = state.counter - 1;
    },
    addNumber(state, action) {
      state.counter += +action.payload;
    },
  },
});



export const counterActions = counterSlice.actions;

export default counterSlice.reducer;
