import { useContext, useEffect } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {

    const {cartItems, totalPrice} = useContext(CartContext);

    return (
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => {return <CartItem key={item.id} cartItem={item} />})}
                {
                    totalPrice > 0 && <span className='total'>Total: ${totalPrice}</span>
                }
            </div>
            <Button buttonTitle='GO TO CHECKOUT'/>
        </div>
    )
}

export default CartDropdown;