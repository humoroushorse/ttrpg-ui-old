import { createFeatureSelector, createSelector } from '@ngrx/store';
import { USER_FEATURE_KEY, UserState } from './user.reducer';

// Lookup the 'User' feature state managed by NgRx
export const selectUserState = createFeatureSelector<UserState>(USER_FEATURE_KEY);

export const selectUserIsLoading = createSelector(selectUserState, (state: UserState) => state.isLoading);

export const selectUserError = createSelector(selectUserState, (state: UserState) => state.error);

export const selectUserEntity = createSelector(selectUserState, (state: UserState) => state.entity);

export const isloggedIn = createSelector(selectUserState, (state: UserState) => !!state.entity);
