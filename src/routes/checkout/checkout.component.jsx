import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartItems, selectTotalPrice } from '../../store/cart/cart.selectors';
import { selectPaymentSuccess, setPaymentSuccess } from '../../store/payment-succcess/payment-success';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import PaymentForm from '../../components/payment-form/payment-form.component';
import OrderComplete from '../../components/order-complete/order-complete.component';
import './checkout.styles.scss';

const Checkout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setPaymentSuccess(false));
    }, [])

    const cartItems = useSelector(selectCartItems);
    const totalPrice = useSelector(selectTotalPrice);
    const isPaymentSuccessful = useSelector(selectPaymentSuccess);

    return (
        <>
        {
        isPaymentSuccessful ?
        <OrderComplete /> : (
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

            { cartItems.length > 0 && <PaymentForm /> }
        </div>
        )
        }          
        </>
    )

}


export default Checkout;