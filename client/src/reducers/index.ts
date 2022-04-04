import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import characterSlice from "./characterSlice";
import schoolSlice from "./schoolSlice";

const rootReducer = combineReducers({ auth: authSlice, character: characterSlice, school: schoolSlice });

export default rootReducer;
