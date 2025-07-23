import { createSlice } from "@reduxjs/toolkit";

const storedFavItems = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("favorites")) || [] : [];

const initialState = {
    favItems: storedFavItems,
};

const favSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorites(state, action) {
            const { product } = action.payload;
            const existing = state.favItems.find(item => item.product.id == product.id);
            if (!existing)
                state.favItems.push({ product });
            sessionStorage.setItem("favorites", JSON.stringify(state.favItems));
        },
        removeFavorites(state, action) {
            const productId = action.payload;
            state.favItems = state.favItems.filter((item) => item.product.id !== productId);
            sessionStorage.setItem("favorites", JSON.stringify(state.favItems));
        },
        clearFavorites(state) {
            state.favItems = [];
            sessionStorage.removeItem("favorites");
        }
    }
})

export const { addFavorites, removeFavorites, clearFavorites } = favSlice.actions;
export default favSlice.reducer;