// import { createContext, useState, useEffect } from "react";

// export const PaymentSuccessContext = createContext({
//     isPaymentSuccessful: false,
//     SetIsPaymentSuccessful: () => {},

// });

// export const PaymentSuccessProvider = ({children}) => {

//     const [isPaymentSuccessful, SetIsPaymentSuccessful] = useState(false);
//     const value = {isPaymentSuccessful, SetIsPaymentSuccessful};

//     return <PaymentSuccessContext.Provider value={value}>{children}</PaymentSuccessContext.Provider>

// }