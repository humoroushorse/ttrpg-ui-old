import { props, createActionGroup, emptyProps } from '@ngrx/store';
import { IUserEntity } from './user.models';

export const AuthApiActions = createActionGroup({
  source: 'User/API',
  events: {
    'Google Login User Success': emptyProps(),
    'Google Login User Failure': props<{ error: any }>(),
    'Logout User Success': emptyProps(),
    'Logout User Failure': props<{ error: any }>(),
  },
});

export const AuthActions = createActionGroup({
  source: 'Auth',
  events: {
    Logout: emptyProps(),
    'Google Login': emptyProps(),
    'Get User': emptyProps(),
    'User Authenticated': props<{ user: IUserEntity }>(),
    'User Not Authenticated': emptyProps(),
    'Auth Error': props<{ error: any }>(),
  },
});
