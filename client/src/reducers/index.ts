import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import characterSlice from "./characterSlice";
import courseSlice from "./courseSlice";
import schoolSlice from "./schoolSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  character: characterSlice,
  school: schoolSlice,
  course: courseSlice,
});

export default rootReducer;
