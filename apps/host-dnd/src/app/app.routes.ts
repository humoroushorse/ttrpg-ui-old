import { Route } from '@angular/router';
// import { coreAuthRoutes } from '@ttrpg-ui/core/auth';
import { PageHomeComponent } from './pages/page-home/page-home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const appRoutes: Route[] = [
  // { path: 'login', children: coreAuthRoutes },
  {
    path: 'login',
    loadChildren: () => import('@ttrpg-ui/core/auth').then((m) => m.CoreAuthModule),
  },
  {
    path: 'spells',
    loadChildren: () => import('mfe-spells/Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: 'home',
    component: PageHomeComponent,
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
