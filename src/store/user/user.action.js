import { createAction } from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";


export const setCurrentUser = (user) => {
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
};

export const setUserFavorites = (favorites) => {
    return createAction(USER_ACTION_TYPES.SET_USER_FAVORITES, favorites);
};