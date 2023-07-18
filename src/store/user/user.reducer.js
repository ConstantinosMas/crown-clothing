import { USER_ACTION_TYPES } from "./user.types";

const INITIAL_STATE = {
    currentUser: null, 
    userFavorites: [],
    isLoading: false,
    error: null
};

export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SIGN_UP_START:
        case USER_ACTION_TYPES.EMAIL_SIGN_IN_START:
        case USER_ACTION_TYPES.GOOGLE_SIGN_IN_START:
            return {
                ...state,
                isLoading: true
            };
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload,
                isLoading: false
            };
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_IN_FAILED:
            return {
                ...state,
                error: payload,
                isLoading: false
            };

        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                userFavorites: null
            }
        case USER_ACTION_TYPES.SET_USER_FAVORITES:
            return {
                ...state,
                userFavorites: payload
            };
        case USER_ACTION_TYPES.CLEAR_USER_ERROR:
            return {
                ...state,
                error: null
            }    
        default:
            return state;
    }
};

