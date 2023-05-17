import { createContext, useState, useEffect } from "react";

const modifyCartItems = (cartItems, productToAdd, increaseOrDecrease) => {
    const existingCartItem = cartItems.find((cartItem) => {return cartItem.id == productToAdd.id});
    if (existingCartItem) {
        if (increaseOrDecrease == 'decrease') {
            return cartItems.map((cartItem) => {
                return cartItem.id == productToAdd.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
            });
        }

        return cartItems.map((cartItem) => {
            return cartItem.id == productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        });
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToDelete) => {
    return cartItems.filter((item) => {return item.id !== productToDelete.id});
};

export const CartContext = createContext({
    iscartDropdownOpen: 'false',
    setiscartDropdownOpen: () => null,
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    totalPrice: 0,
    makeCartIconPulsate: false,
    setMakeCartIconPulsate: () => {},
    deleteCartItem: () => {}
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


    const modifyCart = (productToAdd, increaseOrDecrease = 'increase') => {
        setCartItems(modifyCartItems(cartItems, productToAdd, increaseOrDecrease));
    }

    const deleteCartItem = (productToDelete) => {
        setCartItems(removeCartItem(cartItems, productToDelete));
    }

    const value = {iscartDropdownOpen, setiscartDropdownOpen, modifyCart, deleteCartItem, cartItems, setCartItems, totalPrice, cartCount, makeCartIconPulsate, setMakeCartIconPulsate};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

