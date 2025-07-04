import { configureStore } from "@reduxjs/toolkit";
import registrationReducer from "./RegistrationReducer";
import loginReducer from "./loginReduder";

export const store = configureStore({
  reducer: {
    auth: registrationReducer,
    login: loginReducer,
  },
});
