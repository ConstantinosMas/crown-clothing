import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({product}) => {

    const {name, imageUrl, quantity, price} = product;
    const {modifyCart} = useContext(CartContext);

    const increaseItemCount = () => {
        modifyCart(product)
    };

    const decreaseItemCount = () => {
        modifyCart(product, 'decrease')
    };

    const removeItemFromCart = () => {
        modifyCart(product, 'delete');
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

}

export default CheckoutItem;