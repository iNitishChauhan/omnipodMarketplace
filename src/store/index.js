import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";
import mediaReducer from "./media/mediaReducer"
export const store = configureStore({
  reducer: {
    auth: authReducer,media:mediaReducer
  },
});
