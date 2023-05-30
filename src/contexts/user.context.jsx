import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth, getAuthUserFavorites } from "../utils/firebase/firebase.utils";
import { createAction } from "../utils/reducer/reducer.utils";

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
        dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))
    };
    
    const setUserFavorites = (favorites) => {
        dispatch(createAction(USER_ACTION_TYPES.SET_USER_FAVORITES, favorites));
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