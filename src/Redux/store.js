import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./RegistrationReducer";

export const store = configureStore({
  reducer: {
    auth: registrationReducer,
  },
});
