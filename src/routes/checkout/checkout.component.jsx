import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import './checkout.styles.scss';

const Checkout = () => {

    const {cartItems, totalPrice} = useContext(CartContext);

    return (
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>

                <div className='header-block'>
                    <span>Description</span>
                </div>

                <div className='header-block'>
                    <span>Quantity</span>
                </div>

                <div className='header-block'>
                    <span>Price</span>
                </div>

                <div className='header-block'>
                    <span>Remove</span>
                </div>
                
            </div>
            {cartItems.map((item) => {
                return (<CheckoutItem key={item.id} product={item}/>)
            })}
            { cartItems.length == 0 && <span className='empty-cart'>No items in your cart</span> }
            { cartItems.length > 0 && <span className='total'>TOTAL: ${totalPrice}</span> }
        </div>
    )

}


export default Checkout;