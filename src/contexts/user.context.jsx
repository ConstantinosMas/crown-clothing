import { createContext, useState, useEffect } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getAuthUserFavorites } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
    userFavorites: [],
});

export const UserProvider = ({children}) => {

    const [currentUser, setCurrentUser] = useState(null);
    const [userFavorites, setUserFavorites] = useState([]);
    const value = {currentUser, setCurrentUser, userFavorites};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => { //the onAuthStateChanged function returns the unsbriscribe method itself, so you just call it
            if (user) {
                createUserDocumentFromAuth(user);
            }         
            setCurrentUser(user);

            const setUserFavs = async () => {
                user && setUserFavorites(await getAuthUserFavorites(user));
            }
            setUserFavs();
        });

        return unsubscribe;
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}