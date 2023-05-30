import { createContext, useState, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getAuthUserFavorites } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
    userFavorites: [],
});

const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER',
    SET_USER_FAVORITES: 'SET_USER_FAVORITES',
};

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            };
        case USER_ACTION_TYPES.SET_USER_FAVORITES:
            return {
                ...state,
                userFavorites: payload
            };    
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
};

const INITIAL_STATE = {
    currentUser: null, 
    userFavorites: [],
};

export const UserProvider = ({children}) => {
    const [{ currentUser, userFavorites }, dispatch] = useReducer(userReducer, INITIAL_STATE);

    const setCurrentUser = (user) => {
        dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user}) // dispatch receives the ACTION object which consists of a type and an optional payload
    };
    
    const setUserFavorites = (favorites) => {
        dispatch({type: USER_ACTION_TYPES.SET_USER_FAVORITES, payload: favorites});
    };

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