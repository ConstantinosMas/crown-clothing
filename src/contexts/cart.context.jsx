import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => {return cartItem.id == productToAdd.id});
    if (existingCartItem) {
        return cartItems.map((cartItem) => {
            return cartItem.id == productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        });
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

export const CartContext = createContext({
    iscartDropdownOpen: 'false',
    setiscartDropdownOpen: () => null,
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    totalPrice: 0,
    makeCartIconPulsate: false,
    setMakeCartIconPulsate: () => {}
})

export const CartProvider = ({children}) => {
   
    const [iscartDropdownOpen, setiscartDropdownOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [makeCartIconPulsate, setMakeCartIconPulsate] = useState(false);

    useEffect(() => {
        setCartCount(cartItems.reduce((total, currentItem) => {return total + currentItem.quantity}, 0));
        setTotalPrice(cartItems.reduce((total, currentItem) => {return total + currentItem.price * currentItem.quantity}, 0));
    }, [cartItems]);

    useEffect(() => {
        setTimeout(() => {
            setMakeCartIconPulsate(false);
        }, 800);
    }, [makeCartIconPulsate]);


    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {iscartDropdownOpen, setiscartDropdownOpen, addItemToCart, cartItems, totalPrice, cartCount, makeCartIconPulsate, setMakeCartIconPulsate};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

