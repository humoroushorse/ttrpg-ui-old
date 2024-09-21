import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, map } from 'rxjs';
import * as UserActions from './user.actions';
import * as UserFeature from './user.reducer';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUserEntity } from './user.models';
import { CoreAuthService } from '../data-access/core-auth.service';

@Injectable()
export class UserEffects {
  private coreAuthService = inject(CoreAuthService);
  private actions$ = inject(Actions);

  constructor(private afAuth: AngularFireAuth) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.AuthActions.getUser),
      switchMap(() => {
        return this.afAuth.authState;
      }),
      map((authData) => {
        console.log('authData', authData);
        if (authData) {
          return UserActions.AuthActions.userAuthenticated({
            user: {
              uid: authData.uid,
              emailVerified: authData.emailVerified,
              displayName: authData.displayName,
              email: authData.email,
              photoURL: authData.photoURL,
            },
          });
        }
        return UserActions.AuthActions.userNotAuthenticated();
      }),
      catchError((error) => {
        return of(UserActions.AuthActions.authError({ error }));
      })
    )
  );

  googleLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.AuthActions.googleLogin),
      switchMap(() => {
        console.log('got type google login');
        return this.coreAuthService.googleLogin();
      }),
      map(() => {
        console.log('mapping now');
        return UserActions.AuthApiActions.googleLoginUserSuccess();
      }),
      catchError((error) => {
        console.log('got error: ', error);
        return of(UserActions.AuthApiActions.googleLoginUserFailure({ error }));
      })
    )
  );

  // since the login does not return the user, we trigger get user
  googleLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.AuthApiActions.googleLoginUserSuccess),
      map(() => {
        return UserActions.AuthActions.getUser();
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.AuthActions.logout),
      switchMap(() => {
        return this.coreAuthService.logout();
      }),
      map(() => {
        return UserActions.AuthApiActions.logoutUserSuccess();
      }),
      catchError((error) => {
        return of(UserActions.AuthApiActions.logoutUserFailure({ error }));
      })
    )
  );
}
