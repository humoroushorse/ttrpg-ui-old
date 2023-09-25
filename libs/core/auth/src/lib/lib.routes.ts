import { Route } from '@angular/router';
import { PageLoginComponent } from './pages/page-login/page-login.component';

export const coreAuthRoutes: Route[] = [
  {
    path: 'login',
    component: PageLoginComponent,
  },
];
