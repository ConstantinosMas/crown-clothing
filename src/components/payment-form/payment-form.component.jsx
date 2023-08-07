import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTotalPrice } from '../../store/cart/cart.selectors';
import { selectCurrentUser } from '../../store/user/user.selectors';
import { setPaymentSuccess } from "../../store/payment-succcess/payment-success";
import { setterMethod } from "../../store/cart/cart.action";
import { SETTER_METHOD_TYPES } from "../../store/cart/cart.types";
import { selectCartItems } from "../../store/cart/cart.selectors";
import { saveOrderToDb } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import './payment-form.styles.scss';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const dispatch = useDispatch();

    const amount = useSelector(selectTotalPrice);
    const currentUser = useSelector(selectCurrentUser);
    const orderItems = useSelector(selectCartItems).map(({ imageUrl, ...details }) => {return details});
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);


    const paymentHandler = async (e) => {
        e.preventDefault();

        const orderDetails = {
            name: currentUser ? currentUser.displayName : 'Guest',
            userId: currentUser ? currentUser.uid : '',
            amount: amount,
            products: orderItems,
            createdAt: new Date()
        };

        if (!stripe || !elements) { return; }

        setIsProcessingPayment(true);

        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: amount * 100})
        }).then(res => res.json());

        const clientSecret = response.paymentIntent.client_secret;

        const paymentResult = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser ? currentUser.displayName : 'Guest'
                }
            }
        });

        setIsProcessingPayment(false);

        if (paymentResult.error) {
            alert(paymentResult.error.message);
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded') {
                dispatch(setterMethod(SETTER_METHOD_TYPES.setCartItems, []));
                await saveOrderToDb(orderDetails);
                dispatch(setPaymentSuccess(true));
            }
        }
    };

    return (
        <div className="payment-form-container">
            <form className="payment-form" onSubmit={paymentHandler}>
                <h2>Credit Card Payment:</h2>       
                <CardElement />
                <Button
                buttonTitle ='Pay now'
                buttonType ='inverted'
                isLoading={isProcessingPayment}
                paymentButton
                />
            </form>
        </div> 
        )
}

export default PaymentForm;