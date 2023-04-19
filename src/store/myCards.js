import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userCards: [],
};

const myCardsSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {
    setUserCards(state, action) {
      state.userCards = action.payload;
    },
  },
});

export const { setUserCards } = myCardsSlice.actions;

export default myCardsSlice.reducer;
