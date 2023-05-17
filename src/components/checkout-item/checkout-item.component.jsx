import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = ({product}) => {

    const {name, imageUrl, quantity, price} = product;
    const {modifyCart, deleteCartItem} = useContext(CartContext);

    const increaseItemCount = () => {
        modifyCart(product)
    };

    const decreaseItemCount = () => {
        modifyCart(product, 'decrease')
    };

    const removeItemFromCart = () => {
        deleteCartItem(product);
    };

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={imageUrl} alt={name}/>
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                { product.quantity > 1 && <span onClick={decreaseItemCount} className='arrow value'>{`< `}</span>}
                {quantity} 
                <span onClick={increaseItemCount} className='arrow value'>{` >`}</span>
            </span>
            <span className="price">{price * quantity}</span>
            <span onClick={removeItemFromCart} className="remove-button">X</span>
        </div>
    )

}

export default CheckoutItem;