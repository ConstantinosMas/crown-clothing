import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCartItems, selectTotalPrice } from '../../store/cart/cart.selectors';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {

    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const navigate = useNavigate();
    
    const goToCheckoutHandler = () => {
        navigate('/checkout');
    }

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => {return <CartItem key={item.id} cartItem={item} />})}
                {
                    totalPrice > 0 && <span className='total'>Total: ${totalPrice}</span>
                }
                { cartItems.length == 0 && <span className='empty-message'>Your cart is empty</span> }
            </div>
            { cartItems.length > 0 && <Button onClick={goToCheckoutHandler} buttonTitle='GO TO CHECKOUT' /> }
        </div>
    )
}


export default CartDropdown;