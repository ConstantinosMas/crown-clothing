import { combineReducers } from "redux";

import { userReducer } from "./user/user.reducer";
import { categoriesReducer } from "./categories/category.reducer";
import { cartReducer } from "./cart/cart.reducer";
import { paymentSuccessReducer } from "./payment-succcess/payment-success";

export const rootReducer = combineReducers({
    user: userReducer,
    categories: categoriesReducer,
    cart: cartReducer,
    paymentSuccess: paymentSuccessReducer
});