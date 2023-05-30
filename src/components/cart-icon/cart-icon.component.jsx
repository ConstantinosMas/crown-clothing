import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';

const CartIcon = () => {

    const {iscartDropdownOpen, cartCount, makeCartIconPulsate, setterMethod, SETTER_METHOD_TYPES} = useContext(CartContext);
    const dropdownHandler = () => {
        setterMethod(SETTER_METHOD_TYPES.setiscartDropdownOpen, !iscartDropdownOpen);
    };
    
    
    return (
        <div onClick={dropdownHandler} className='cart-icon-container'>
            <ShoppingIcon className={makeCartIconPulsate ? 'shopping-icon pulsate' : 'shopping-icon'} />
            <span className={makeCartIconPulsate ? 'item-count pulsate' : 'item-count'}>{cartCount}</span>
        </div>
    )
}

export default CartIcon;