import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null, 
    userFavorites: [],
};

export const userReducer = (state = INITIAL_STATE, action) => {
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
            return state;
    }
};

