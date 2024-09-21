# Project Creation

## NRWL Init

- `npx create-nx-workspace ttrpg-ui`
  ✔ Which stack do you want to use? · angular
  ✔ Standalone project or integrated monorepo? · integrated
  ✔ Application name · ik-delete-me
  ✔ Default stylesheet format · scss
  ✔ Would you like to use Standalone Components in your application? · Yes
  ✔ Would you like to add routing? · Yes
  ✔ Enable distributed caching to make your CI faster · Yes
- moved everything out of ttrpg-ui into the directory it was generated in (flattened it into my git folder)
- deleted the generated ik-delete-me and ik-delete-me-e2e apps

## Create first host/mfe apps

- `npx nx g @nx/angular:host host-dnd`
  ✔ Which stylesheet format would you like to use? · scss
- `npx nx g @nx/angular:remote mfe-spells --host=host-dnd`
  ✔ Which stylesheet format would you like to use? · scss

## replicate npm scripts from another project

```json
{
  "scripts": {
    "ng": "npx nx",
    "start": "nx serve",
    "build": "nx build",
    "lint": "nx workspace-lint && ng lint",
    "prettier:check": "prettier --config .prettierrc --check \"src/**/*.{ts,css,html}\"",
    "// - CORE SCRIPTS": "core scripts",
    "install": "npm install huskey",
    "prepare": "husky install",
    "// - TARGET APPS": "app specific scripts",
    "host-dnd:test": "nx run host-dnd:test",
    "host-dnd:test:ci": "nx test host-dnd --ci --max-workers=4",
    "host-dnd:test:affected": "npm run affected:test --uncomitted",
    "host-dnd:test:e2e": "ng e2e host-dnd",
    "host-dnd:test:e2e:ci": "ng e2e host-dnd --headless",
    "// - AFFECTED": "run on only affected modules",
    "affected:apps": "nx affected:apps",
    "affected:libs": "nx affected:libs",
    "affected:build": "nx affected:build",
    "affected:deploy": "nx affected:deploy",
    "affected:e2e": "nx affected:e2e",
    "affected:test": "nx affected:test",
    "affected:lint": "nx affected:lint",
    "affected:dep-graph": "nx affected:dep-graph",
    "affected": "nx affected",
    "// - FORMAT": "format and lint utils",
    "format": "nx format:write",
    "format:write": "nx format:write",
    "format:check": "nx format:check",
    "update": "nx update @nrwl/workspace",
    "update:check": "nx update",
    "workplace-schematic": "nx workspace-schematic",
    "typecheck": "tsc --noEmit --skipLibCheck",
    "dep-graph": "nx dep-graph",
    "help": "nx-help",
    "nx": "npx nx",
    "// postinstall": "node ./decorate-angular-cli.js && ngcc --propertites es2020 browser module main"
  }
}
```

## add husky

- added package.json stuff for husky and relevant scripts

```json
{
  "lint-staged": {
    "{apps,libs}/**/*.{ts,json,md,scss,html}": [
      "npm run affected:lint --uncomitted --parallel --fix=true",
      "npm run format:write --uncomitted",
      "git add"
    ]
  }
}
```

- `npm install husky lint-staged --save-dev`
- `npx husky-init && npm install`
- create hooks (will add files in .husky directory)
  - `npx husky add .husky/pre-commit "npx lint-staged"`
  - `npx husky add .husky/pre-push "npm run affected:test"`
-

## update .prettierrc

```json
{
  "tabWidth": 2,
  "singleQuote": true,
  "printWidth": 120,
  "bracketSpacing": true
}
```

## NgRx

### Create host-dnd root store

- `npx nx g @nx/angular:ngrx-root-store`
  ✔ What app would you like to generate a NgRx configuration for? · host-dnd
  ✔ Would you like to use a Facade with your NgRx state? (y/N) · false

### Adding DevTooling

- Following the guide for [NgRx Store DevTools](https://v7.ngrx.io/guide/store-devtools)
- doing this for apps/host-dnd/src/app/app.module.ts

  1. download the [Redux Devtools Extension](https://github.com/zalmoxisus/redux-devtools-extension/)
  2. In your AppModule add instrumentation to the module imports using StoreDevtoolsModule.instrument:

  ```javascript
  import { StoreDevtoolsModule } from '@ngrx/store-devtools';
  import { environment } from '../environments/environment'; // Angular CLI environemnt

  @NgModule({
    imports: [
      StoreModule.forRoot(reducers),
      // Instrumentation must be imported after importing StoreModule (config is optional)
      StoreDevtoolsModule.instrument({
        maxAge: 25, // Retains last 25 states
        logOnly: environment.production, // Restrict extension to log-only mode
      }),
    ],
  })
  export class AppModule {}
  ```

## adding core/auth routing lib (with NgRx)

- see [Firebase.md](./Firebase.md)
