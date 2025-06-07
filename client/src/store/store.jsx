import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import bookReducer from "./slices/bookSlice";
import pageReducer from "./slices/pageSlice";
import authReducer from "./slices/authSlice";
import notificationReducer from "./slices/notificationSlice";
import favoritesReducer from "./slices/favoritesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    books: bookReducer,
    pages: pageReducer,
    notification: notificationReducer,
    favorites: favoritesReducer,
  },
});
