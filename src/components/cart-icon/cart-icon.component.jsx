import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './cart-icon.styles.scss';

const CartIcon = () => {

    const {iscartDropdownOpen, setiscartDropdownOpen} = useContext(CartContext);
    const dropdownHandler = () => {setiscartDropdownOpen(!iscartDropdownOpen)};

    return (
        <div onClick={dropdownHandler} className='cart-icon-container'>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>0</span>
        </div>
    )
}

export default CartIcon;