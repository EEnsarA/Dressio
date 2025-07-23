import { createSlice } from "@reduxjs/toolkit";


const storedCart = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("cart")) || [] : [];

const initialState = {
    items: storedCart,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const { product, count } = action.payload;
            const existing = state.items.find(item => item.product.id == product.id);
            if (existing) {
                existing.count += count;
            } else {
                state.items.push({ product, count });
            }
            sessionStorage.setItem("cart", JSON.stringify(state.items));
        },
        removeFromCart(state, action) {
            const productId = action.payload;
            state.items = state.items.filter((item) => item.product.id !== productId);

            sessionStorage.setItem("cart", JSON.stringify(state.items));
        },
        decreaseItem(state, action) {
            const item = state.items.find((item) => item.product.id === action.payload);
            if (item) {
                if (item.count > 1) {
                    item.count -= 1;
                } else {
                    state.items = state.items.filter((item) => item.product.id !== action.payload);
                }
            }
            sessionStorage.setItem("cart", JSON.stringify(state.items));
        },
        clearCart(state) {
            state.items = [];
            sessionStorage.removeItem("cart");
        }
    }
})


export const { addToCart, removeFromCart, decreaseItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;