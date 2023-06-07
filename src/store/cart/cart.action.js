import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, SETTER_METHOD_TYPES } from "./cart.types";
import { store } from "../store";

const removeCartItem = (cartItems, productToDelete) => {
    return cartItems.filter((item) => {return item.id !== productToDelete.id});
};

const modifyCartItems = (cartItems, productToModify, modifyType) => {
    const existingCartItem = cartItems.find((cartItem) => {return cartItem.id == productToModify.id});
    if (existingCartItem) {
        if (modifyType == 'decrease') {
            if (productToModify.quantity == 1) {
               return removeCartItem(cartItems, productToModify);
            }

            return cartItems.map((cartItem) => {
                return cartItem.id == productToModify.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
            });
        }

        return cartItems.map((cartItem) => {
            return cartItem.id == productToModify.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        });
    }

    return [...cartItems, {...productToModify, quantity: 1}];
}


export const setterMethod = (setter, setterValue = null) => {
    switch(setter) {
        case SETTER_METHOD_TYPES.setiscartDropdownOpen:
            return createAction(CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN);

        case SETTER_METHOD_TYPES.setCartItems:
            return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, setterValue);

        case SETTER_METHOD_TYPES.setMakeCartIconPulsate:
            return createAction(CART_ACTION_TYPES.MAKE_CART_ICON_PULSATE, setterValue);
    }
};

export const modifyCart = (productToModify, modifyType = 'increase', receivedCartFromDatabase = []) => {
    let newCart;
    const cartItems = store.getState().cart.cartItems;

    switch (modifyType) {
        case 'increase':
            newCart = modifyCartItems(cartItems, productToModify, modifyType);
            break;
            case 'decrease':
                newCart = modifyCartItems(cartItems, productToModify, modifyType);
                break;
            case 'delete':
                newCart = removeCartItem(cartItems, productToModify);
                break;
        case 'restoringUserCart':
            newCart = receivedCartFromDatabase;
            break; 
    }

    const newTotal = newCart.reduce((total, currentItem) => {return total + currentItem.price * currentItem.quantity}, 0);
    const newCartCount = newCart.reduce((total, currentItem) => {return total + currentItem.quantity}, 0);
    const newPayload = {
        cartItems: newCart,
        cartCount: newCartCount,
        totalPrice: newTotal
    };
    return setterMethod(SETTER_METHOD_TYPES.setCartItems, newPayload);
}