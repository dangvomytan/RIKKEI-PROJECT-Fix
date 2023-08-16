import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../slice/reducers";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
