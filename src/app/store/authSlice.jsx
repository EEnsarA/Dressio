'use client';

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogged: false,
    token: null,
    user: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload;
            sessionStorage.setItem("token", action.payload);
        },
        loginUser(state, action) {
            state.isLogged = true;
            state.user = action.payload;
            sessionStorage.setItem("user", action.payload);
        },
        logoutUser(state) {
            state.isLogged = false;
            state.user = null;
            state.token = null;
            sessionStorage.clear();
        }
    }
});


export const { loginUser, logoutUser, setToken } = authSlice.actions;
export default authSlice.reducer;