import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreThemePickerComponent, CoreThemeService, CoreThemeToggleComponent, IAppTheme } from '@ttrpg-ui/core/theme';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { BehaviorSubject } from 'rxjs';
import { RouterModule } from '@angular/router';
import { AuthActions, UserFacade } from '@ttrpg-ui/core/auth';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';

interface ISidenavLink {
  link: string;
  displayText: string;
}

@Component({
  selector: 'ttrpg-ui-app-layout',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatMenuModule,
    RouterModule,
    CoreThemePickerComponent,
    CoreThemeToggleComponent,
  ],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
})
export class AppLayoutComponent {
  public activeTheme$: BehaviorSubject<IAppTheme> = this.coreThemeService.activeTheme$;

  public user$ = this.userFacade.user$;

  @Input() appTitle = 'App Title';

  public sidenavLinks: ISidenavLink[] = [
    { link: '/home', displayText: 'Home' },
    { link: '/spells', displayText: 'Spells' },
  ];

  constructor(private coreThemeService: CoreThemeService, private userFacade: UserFacade, private store: Store) {}

  public logout(): void {
    this.store.dispatch(AuthActions.logout());
  }

  public trackByDisplayText(_: number, snavLink: ISidenavLink): string {
    return snavLink.displayText;
  }
}
