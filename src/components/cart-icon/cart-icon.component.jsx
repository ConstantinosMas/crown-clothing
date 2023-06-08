import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useSelector, useDispatch } from 'react-redux';
import { setterMethod } from '../../store/cart/cart.action';
import { SETTER_METHOD_TYPES } from '../../store/cart/cart.types';
import { selectIsCartDropdownOpen, selectCartCount, selectCartIconPulsate } from '../../store/cart/cart.selectors';
import './cart-icon.styles.scss';

const CartIcon = () => {

    const dispatch = useDispatch();
    const iscartDropdownOpen = useSelector(selectIsCartDropdownOpen);
    const cartCount = useSelector(selectCartCount);
    const makeCartIconPulsate = useSelector(selectCartIconPulsate);

    const dropdownHandler = () => {
        dispatch(setterMethod(SETTER_METHOD_TYPES.setiscartDropdownOpen, !iscartDropdownOpen));
    };
    
    
    return (
        <div onClick={dropdownHandler} className='cart-icon-container'>
            <ShoppingIcon className={makeCartIconPulsate ? 'shopping-icon pulsate' : 'shopping-icon'} />
            <span className={makeCartIconPulsate ? 'item-count pulsate' : 'item-count'}>{cartCount}</span>
        </div>
    )
}

export default CartIcon;