import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Redux/UsersSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
