// root reducer

import { combineReducers } from "@reduxjs/toolkit";
import userReducers from "./user.Slice";

const rootReducer = combineReducers({
  userReducer: userReducers,
});

export default rootReducer;