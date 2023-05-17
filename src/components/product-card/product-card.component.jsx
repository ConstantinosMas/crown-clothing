import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';
import './product-card.styles.scss';


const ProductCard = ({product}) => {

    const {name, imageUrl, price} = product;
    const {addItemToCart, setMakeCartIconPulsate} = useContext(CartContext);

    const addToCartHandler = () => {
        addItemToCart(product);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });      
        setTimeout(() => {
            setMakeCartIconPulsate(true);
        }, 500);
        
    }

    return (
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>$ {price}</span>
            </div>
            <Button onClick={addToCartHandler} buttonTitle='Add to cart' buttonType='inverted' />
        </div>
    )
}

export default ProductCard;