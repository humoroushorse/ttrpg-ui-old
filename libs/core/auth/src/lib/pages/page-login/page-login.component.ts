import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../+state/user.actions';
import { UserFacade } from '../../+state/user.facade';

@Component({
  selector: 'ttrpg-ui-page-login',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './page-login.component.html',
  styleUrls: ['./page-login.component.scss'],
})
export class PageLoginComponent {
  public user$ = this.userFacade.user$;

  constructor(private store: Store, private userFacade: UserFacade) {
    this.store.dispatch(AuthActions.getUser());
  }

  public loginGoogle() {
    this.store.dispatch(AuthActions.googleLogin());
  }

  public logout() {
    this.store.dispatch(AuthActions.logout());
  }
}
