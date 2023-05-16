import { createContext, useState } from "react";

export const CartContext = createContext({
    iscartDropdownOpen: 'false',
    setiscartDropdownOpen: () => null
})

export const CartProvider = ({children}) => {

    const [iscartDropdownOpen, setiscartDropdownOpen] = useState(false);
    const value = {iscartDropdownOpen, setiscartDropdownOpen};


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

