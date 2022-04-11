import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import characterSlice from "./characterSlice";
import courseSlice from "./courseSlice";
import schoolSlice from "./schoolSlice";
import subjectSlice from "./subjectSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  character: characterSlice,
  school: schoolSlice,
  course: courseSlice,
  subject: subjectSlice,
});

export default rootReducer;
