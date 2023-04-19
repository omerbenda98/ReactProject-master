import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./counter";
import darkThemeReducer from "./darkTheme";
import authReducer from "./auth";
import favoriteReducer from "./favorite";
import myCardsReducer from "./myCards";

const store = configureStore({
  reducer: {
    counterSlice: counterReducer,
    darkThemeSlice: darkThemeReducer,
    authSlice: authReducer,
    favoriteSlice: favoriteReducer,
    myCardsSlice: myCardsReducer,
  },
});

export default store;
