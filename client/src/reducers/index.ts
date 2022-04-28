import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import characterSlice from "./characterSlice";
import promotionSlice from "./promotionSlice";
import quizSlice from "./quizSlice";
import schoolSlice from "./schoolSlice";
import subjectSlice from "./subjectSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  character: characterSlice,
  school: schoolSlice,
  promotion: promotionSlice,
  subject: subjectSlice,
  quiz: quizSlice,
});

export default rootReducer;
