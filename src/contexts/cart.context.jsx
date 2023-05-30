import { createContext, useState, useEffect, useContext, useReducer } from "react";
import { saveCartToAuthUser, getAuthUserCart } from "../utils/firebase/firebase.utils";
import { UserContext } from "./user.context";



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

const removeCartItem = (cartItems, productToDelete) => {
    return cartItems.filter((item) => {return item.id !== productToDelete.id});
};


export const CartContext = createContext({
    iscartDropdownOpen: false,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
    makeCartIconPulsate: false,
    setterMethod: () => {},
    SETTER_METHOD_TYPES: {}
})

const CART_ACTION_TYPES = {
    TOGGLE_CART_DROPDOWN: 'TOGGLE_CART_DROPDOWN',
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_CART_COUNT: 'SET_CART_COUNT',
    SET_CART_TOTAL: 'SET_CART_TOTAL',
    MAKE_CART_ICON_PULSATE: 'MAKE_CART_ICON_PULSATE',
};

const cartReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN:
            return {
                ...state,
                iscartDropdownOpen: !state.iscartDropdownOpen
            };
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.MAKE_CART_ICON_PULSATE:
            return {
                ...state,
                makeCartIconPulsate: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};

const INITIAL_STATE = {
    iscartDropdownOpen: false,
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
    makeCartIconPulsate: false,
};

export const CartProvider = ({children}) => {
    const {currentUser} = useContext(UserContext);
    const [{ iscartDropdownOpen, cartItems, cartCount, totalPrice, makeCartIconPulsate }, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const SETTER_METHOD_TYPES = {
        setiscartDropdownOpen: 'setiscartDropdownOpen',
        setCartItems: 'setCartItems',
        setMakeCartIconPulsate: 'setMakeCartIconPulsate'
    };

    // This method is used to replace individual methods for all 'set' functions. Now, they are all in one, the case statement will determine which 'set' function will run. //
    const setterMethod = (setter, setterValue = null) => {
        switch(setter) {
            case SETTER_METHOD_TYPES.setiscartDropdownOpen:
                dispatch({type: CART_ACTION_TYPES.TOGGLE_CART_DROPDOWN});
                break;

            case SETTER_METHOD_TYPES.setCartItems:
                dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: setterValue});
                break;

            case SETTER_METHOD_TYPES.setMakeCartIconPulsate:
                dispatch({type: CART_ACTION_TYPES.MAKE_CART_ICON_PULSATE, payload: setterValue});
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setterMethod(SETTER_METHOD_TYPES.setMakeCartIconPulsate, false);
        }, 800);
    }, [makeCartIconPulsate]);

    useEffect(() => {  
        currentUser && saveCartToAuthUser(currentUser, cartItems);    
    }, [cartItems]);

    useEffect(() => {
        if (currentUser) {
            const getCartFromFirestore = async () => {
                const savedCart = await getAuthUserCart(currentUser);
                if (savedCart.length > 0) {
                    modifyCart(null, 'restoringUserCart', savedCart);
                }
            };
            getCartFromFirestore();  
        }     
    }, [currentUser]);


    const modifyCart = (productToModify, modifyType = 'increase', receivedCartFromDatabase = []) => {
        let newCart;

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
        setterMethod(SETTER_METHOD_TYPES.setCartItems, newPayload);       
    }

    const value = {iscartDropdownOpen, modifyCart, cartItems, totalPrice, cartCount, makeCartIconPulsate, setterMethod, SETTER_METHOD_TYPES};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

