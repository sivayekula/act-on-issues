import { configureStore } from "@reduxjs/toolkit";
import {userSlice} from "./reducers/userSlice";
import {issueSlice} from "./reducers/issueSlice";

export const store = configureStore({
    reducer:{
        userData:userSlice.reducer,
        issueData:issueSlice.reducer
    }
})