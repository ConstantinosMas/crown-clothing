import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems 
);

export const selectIsCartDropdownOpen = createSelector(
    [selectCartReducer],
    (cart) => cart.iscartDropdownOpen
);

export const selectCartIconPulsate = createSelector(
    [selectCartReducer],
    (cart) => cart.makeCartIconPulsate
);

export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, currentItem) => {return total + currentItem.quantity}, 0)
);

export const selectTotalPrice = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce((total, currentItem) => {return total + currentItem.price * currentItem.quantity}, 0)
);