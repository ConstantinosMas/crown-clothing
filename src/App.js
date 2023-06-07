import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChangedListener, createUserDocumentFromAuth, getAuthUserFavorites, saveCartToAuthUser, getAuthUserCart } from './utils/firebase/firebase.utils';
import { setCurrentUser, setUserFavorites } from './store/user/user.action';
import { modifyCart } from './store/cart/cart.action';
import { selectCurrentUser } from './store/user/user.selectors';
import { selectCartItems } from './store/cart/cart.selectors';

import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';


const App = () => {

  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const cartItems = useSelector(selectCartItems);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => { //the onAuthStateChanged function returns the unsbriscribe method itself, so you just call it
      if (user) {
            createUserDocumentFromAuth(user);
        }         
        dispatch(setCurrentUser(user));

        const setUserFavs = async () => {
            if (user) {
              dispatch(setUserFavorites(await getAuthUserFavorites(user)));
            } else {
              dispatch(setUserFavorites(null));
            }
        }

        setUserFavs();   
    });

    return unsubscribe;
}, []);

  useEffect(() => {  
    currentUser && saveCartToAuthUser(currentUser, cartItems);    
  }, [cartItems]);

  useEffect(() => {
    if (currentUser) {
        const getCartFromFirestore = async () => {
            const savedCart = await getAuthUserCart(currentUser);
            if (savedCart.length > 0) {
                dispatch(modifyCart(null, 'restoringUserCart', savedCart));
            }
        };
        getCartFromFirestore();  
    }     
  }, [currentUser]);

  return (
    <Fragment>

    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='shop/*' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
        <Route path='checkout' element={<Checkout />} />
      </Route>
    </Routes>
    
    </Fragment>
  )

}

export default App;
