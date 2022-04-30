import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import characterSlice from "./characterSlice";
import promotionSlice from "./promotionSlice";
import schoolSlice from "./schoolSlice";
import subjectSlice from "./subjectSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  character: characterSlice,
  school: schoolSlice,
  promotion: promotionSlice,
  subject: subjectSlice,
});

export default rootReducer;
