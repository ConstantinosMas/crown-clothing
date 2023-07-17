import { createAction } from "../../utils/reducer/reducer.utils";

export const PAYMENT_SUCCESS_INITIAL_STATE = {
    paymentSuccess: false
}

export const paymentSuccessReducer = (state = {paymentSuccess: false}, action) => {
    const { type, payload } = action;

    switch (type){
        case 'setPaymentSuccess':
            return {
                ...state,
                paymentSuccess: payload
            }
            default:
                return state;
    }    
}

export const setPaymentSuccess = (payload) => createAction('setPaymentSuccess', payload);

export const selectPaymentSuccess = (state) => state.paymentSuccess.paymentSuccess;