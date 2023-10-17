import { memo } from 'react';

import { useDispatch } from 'react-redux';
import { modifyCart } from '../../store/cart/cart.action';
import './checkout-item.styles.scss';

const CheckoutItem = memo(({product}) => {

    const {name, imageUrl, quantity, price} = product;
    const dispatch = useDispatch();

    const increaseItemCount = () => {
        dispatch(modifyCart(product));
    };

    const decreaseItemCount = () => {
        dispatch(modifyCart(product, 'decrease'));
    };

    const removeItemFromCart = () => {
        dispatch(modifyCart(product, 'delete'));
    };

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name}/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div onClick={decreaseItemCount} className='arrow'>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div onClick={increaseItemCount} className='arrow'>&#10095;</div>  
            </span>
            <span className="price">{price * quantity}</span>
            <div onClick={removeItemFromCart} className='remove-button'>&#10005;</div>
        </div>
    )

}) 

export default CheckoutItem;