import { combineReducers } from "redux";
import userSlice from "./user.Slice";

const rootReducer = combineReducers({
  user: userSlice,
});

export default rootReducer;
