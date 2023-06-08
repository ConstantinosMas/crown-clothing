import { CART_ACTION_TYPES } from "./cart.types";

const CART_INITIAL_STATE = {
    iscartDropdownOpen: false,
    cartItems: [],
    makeCartIconPulsate: false,
};

export const cartReducer = (state = CART_INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN:
            return {
                ...state,
                iscartDropdownOpen: payload
            };
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                // ...payload,
                cartItems: payload
            };
        case CART_ACTION_TYPES.MAKE_CART_ICON_PULSATE:
            return {
                ...state,
                makeCartIconPulsate: payload
            };
        default:
            return state;
    }
};

