import { createSelector } from "reselect";

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    (user) => user.currentUser
);

export const selectUserFavorites = createSelector(
    [selectUserReducer],
    (user) => user.userFavorites
);

export const selectUserIsLoading = createSelector(
    [selectUserReducer],
    (user) => user.isLoading
);

export const selectUserError = createSelector(
    [selectUserReducer],
    (user) => user.error
);