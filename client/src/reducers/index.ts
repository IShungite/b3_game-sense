import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import characterSlice from "./characterSlice";

const rootReducer = combineReducers({ auth: authSlice, character: characterSlice });

export default rootReducer;
