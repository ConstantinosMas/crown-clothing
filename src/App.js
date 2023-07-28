import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChangedListener, createUserDocumentFromAuth, getAuthUserFavorites, saveCartToAuthUser, getAuthUserCart, getCurrentUser, getUserFavorites } from './utils/firebase/firebase.utils';
import { setCurrentUser, setUserFavorites, checkUserSession} from './store/user/user.action';
import { modifyCart } from './store/cart/cart.action';
import { setterMethod } from './store/cart/cart.action';
import { SETTER_METHOD_TYPES } from './store/cart/cart.types';
import { selectCurrentUser } from './store/user/user.selectors';
import { selectCartItems, selectIsCartDropdownOpen } from './store/cart/cart.selectors';

import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';
import Favorites from './routes/favorites/favorites.component';


const App = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const cartItems = useSelector(selectCartItems);
  const isCartDropdownOpen = useSelector(selectIsCartDropdownOpen);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChangedListener((user) => { //the onAuthStateChanged function returns the unsbriscribe method itself, so you just call it
//       if (user) {
//             createUserDocumentFromAuth(user);
//         }         
//         dispatch(setCurrentUser(user));

//         const setUserFavs = async () => {
//             if (user) {
//               dispatch(setUserFavorites(await getAuthUserFavorites(user)));
//             } else {
//               dispatch(setUserFavorites(null));
//             }
//         }

//         setUserFavs();   
//     });

//     return unsubscribe;
// }, []);

  useEffect(() => {  
    dispatch(checkUserSession());
    // getCurrentUser().then((user) => getUserFavorites(user).then((favorites) => console.log(favorites)));  
    
  }, []);

  // useEffect(() => {  
  //   currentUser && getUserFavorites(currentUser).then((favorites) => dispatch(setUserFavorites(favorites)));
  // }, [currentUser]);

  useEffect(() => {  
    currentUser && saveCartToAuthUser(currentUser, cartItems);
  }, [cartItems]);

  useEffect(() => {
    if (currentUser) {
        const getCartFromFirestore = async () => {
            const savedCart = await getAuthUserCart(currentUser);
            if (savedCart.length > 0) {
                dispatch(modifyCart(null, 'restoringUserCart', savedCart));
            } else {
                saveCartToAuthUser(currentUser, cartItems)
            }
        };
        getCartFromFirestore();  
    }     
  }, [currentUser]);

  const body = document.querySelector('body');
  const cartSvg = document.querySelector('#Capa_1');
  const cartIconNumber = document.querySelector('.item-count');
  const cartIconContainer = document.querySelector('.cart-icon-container');
  body.addEventListener('click', event => {
    if (isCartDropdownOpen) {
      if (event.target != cartSvg && event.target != cartIconNumber && event.target != cartIconContainer) {
        dispatch(setterMethod(SETTER_METHOD_TYPES.setiscartDropdownOpen, false));
      }
    }  
  });

  return (
    <Fragment>

    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
        <Route path='favorites' element={<Favorites />} />
      </Route>
    </Routes>
    
    </Fragment>
  )

}

export default App;
