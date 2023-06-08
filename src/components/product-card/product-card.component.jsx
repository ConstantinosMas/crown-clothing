import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCurrentUser, selectUserFavorites } from '../../store/user/user.selectors';
import { modifyCart, setterMethod } from '../../store/cart/cart.action';
import { SETTER_METHOD_TYPES } from '../../store/cart/cart.types';
import { favoriteButtonHandler } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import './product-card.styles.scss';


const ProductCard = ({product}) => {

    const dispatch = useDispatch();
    const {name, imageUrl, price} = product;
    const currentUser = useSelector(selectCurrentUser);
    const userFavorites = useSelector(selectUserFavorites);
    const [isFav, setIsFav] = useState(false);

    
    useEffect(() => {
        if (currentUser) {
            const productIsFav = userFavorites.find((item) => {return item.id == product.id});
            productIsFav && setIsFav(true); 
        }             
    }, [userFavorites]);


    const favoriteButtonClickHandler = async () => {
        setIsFav(!isFav);
        await favoriteButtonHandler(currentUser, product);
    };

    const addToCartHandler = () => {
        dispatch(modifyCart(product));
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });      
        setTimeout(() => {
            dispatch(setterMethod(SETTER_METHOD_TYPES.setMakeCartIconPulsate, true));
        }, 500);
        
    }

    return (
        <div className='product-card-container'>
            <div className={currentUser ? 'favorite' : 'hidden'}>
                <span onClick={favoriteButtonClickHandler} className={'fav-button'}>
                    <FontAwesomeIcon icon={faHeart} style={isFav ? {color: "red"} : {color: "#ffffff"}} />
                </span>
            </div>
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