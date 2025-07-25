'use client';

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import cartReducer from "./cartSlice"
import favReducer from "./favSlice"



export const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        fav: favReducer,
    }
});