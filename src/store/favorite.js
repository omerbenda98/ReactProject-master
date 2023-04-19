import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payload: [],
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite(state, action) {
      if (!action || !action.payload) {
        console.error("Invalid action or payload");
        return;
      }
      state.payload = [...state.payload, action.payload];
    },
    removeFavorite(state, action) {
      if (!action || !action.payload) {
        console.error("Invalid action or payload");
        return;
      }
      state.payload = state.payload.filter(
        (card) => card._id !== action.payload
      );
    },
  },
});

export const favoriteActions = favoriteSlice.actions;

export default favoriteSlice.reducer;
