import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { InitialState } from "../../types/state.type";

const initialState: InitialState = {
    success: false,
    userInfo: {
        name: "",
        email: "",
        password: ""
    }
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        LogIn: (state, action) => {
            state.success = true;
            state.userInfo.name = action.payload;
            state.userInfo.email = action.payload;
            state.userInfo.password = action.payload;
        },
        Logout: (state) => {
            state.success = false;
            state.userInfo.name = "";
            state.userInfo.email = "";
            state.userInfo.password = "";
        }
    }
});

export const userSelector = (state: RootState) => state.auth;
export const authReducer = authSlice.reducer;
export const { Logout } = authSlice.actions;