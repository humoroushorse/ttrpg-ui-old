import { createReducer, on, Action } from '@ngrx/store';

import * as UserActions from './user.actions';
import { IUserEntity } from './user.models';

export const USER_FEATURE_KEY = 'core_user';

export interface UserState {
  entity: IUserEntity | null;
  isLoading: boolean; // is user loading
  error?: string | null; // last known error (if any)
}

export interface UserPartialState {
  readonly [USER_FEATURE_KEY]: UserState;
}

export const initialUserState: UserState = {
  isLoading: false,
  entity: null,
  error: null,
};

const reducer = createReducer(
  initialUserState,
  on(UserActions.AuthApiActions.logoutUserSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null,
    entity: null,
  })),
  on(UserActions.AuthActions.getUser, UserActions.AuthActions.googleLogin, UserActions.AuthActions.logout, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(UserActions.AuthActions.userAuthenticated, (state, { user }) => ({ ...state, isLoading: false, entity: user })),
  on(UserActions.AuthActions.userNotAuthenticated, (state) => ({ ...state, isLoading: false })),
  on(
    UserActions.AuthActions.authError,
    UserActions.AuthApiActions.googleLoginUserFailure,
    UserActions.AuthApiActions.logoutUserFailure,
    (state, { error }) => ({ ...state, isLoading: false, error: error })
  )
  // on(UserActions.loadUserFailure, (state, { error }) => ({ ...state, error }))
);

export function userReducer(state: UserState | undefined, action: Action) {
  return reducer(state, action);
}
