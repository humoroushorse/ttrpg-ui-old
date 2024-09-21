# Adding a Routing Library

## Create shared/foobar feature library

- host-dnd will get the route /foobar -> future hosts will have to manually add it
  ```javascript
  { path: 'shared-foobar', loadChildren: () => import('@ttrpg-ui/shared/foobar').then((m) => m.SharedFoobarModule) },
  ```
- `npx nx g @nx/angular:lib shared/foobar --routing --lazy --parent=apps/host-dnd/src/app/app.routes.ts`

npx nx g @nx/angular:lib shared/dnd/route-spells --routing --lazy --parent=apps/mfe-spells/src/app/app.routes.ts

## Add feature state to the shared/foobar feature library

- `npx nx g @nx/angular:ngrx foobar --parent=libs/shared/foobar/src/lib/shared-foobar.module.ts`
  ✔ What is the path to the module or Routes definition where this NgRx state should be registered? ·
  ✔ Is this the root state of the application? (y/N) · false
  ✔ Would you like to use a Facade with your NgRx state? (y/N) · false
- Note: nothing selected for the first option

## add /foobar routes to shared/foobar

- `npx nx g @nx/angular:component pages/page-foobar --project=shared-foobar --standalone`
- `npx nx g @nx/angular:component pages/page-foobar-id --project=shared-foobar --standalone`
- update foobar/src/lib/lib.routes.ts to add routes

  ```javascript
  import { Route } from '@angular/router';
  import { PageFoobarIdComponent } from './pages/page-foobar-id/page-foobar-id.component';
  import { PageFoobarComponent } from './pages/page-foobar/page-foobar.component';

  export const featureFoobarRoutes: Route[] = [
    { path: ':id', pathMatch: 'full', component: PageFoobarIdComponent },
    { path: '', pathMatch: 'full', component: PageFoobarComponent },
  ];
  ```

- update foobar/src/lib/pages/page-foobar-id

  ```javascript
  import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { ActivatedRoute } from '@angular/router';

  @Component({
    selector: 'ttrpg-ui-page-foobar-id',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './page-foobar-id.component.html',
    styleUrls: ['./page-foobar-id.component.scss'],
  })
  export class PageFoobarIdComponent {
    public id = this.activatedRoute.snapshot.params['id'];

    constructor(private activatedRoute: ActivatedRoute) {};
  }
  ```
