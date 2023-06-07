import { Fragment, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChangedListener, createUserDocumentFromAuth, getAuthUserFavorites } from './utils/firebase/firebase.utils';
import { setCurrentUser, setUserFavorites } from './store/user/user.action';

import Home from "./routes/home/home.component";
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication';
import Shop from './routes/shop/shop.component';
import Checkout from './routes/checkout/checkout.component';


const App = () => {

  const dispatch = useDispatch();

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
