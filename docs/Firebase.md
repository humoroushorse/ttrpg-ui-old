# Firebase

## Usage

### Init Auth
At the host app, just import the `CoreAuthModule` and you should be good to go.

```javascript
import { CoreAuthModule } from '@ttrpg-ui/core/auth';
...

imports: [
  CoreAuthModule,
],
``` 

### Get User
- `public user$ = this.userFacade.user$;`

## Firebase Emulator Suite

- See the [Firebase Emulator Suite Docs](https://firebase.google.com/docs/emulator-suite#:~:text=The%20Firebase%20Local%20Emulator%20Suite,and%20Firebase%20Extensions%20(beta).)
  - [Install and Configure](https://firebase.google.com/docs/emulator-suite/install_and_configure)
  - [Install CLI](https://firebase.google.com/docs/cli#install_the_firebase_cli)

### CLI Setup

```shell
npm install -g firebase-tools
firebase login
firebase projects:list
```

## project init

- `npm install @angular/fire --save`

- follow the [AddingRoutingLib.md](./AddingRoutingLib.md) guide

  - foobar = auth
  - change the /core-auth route in host-dnd to /login
  - ngrx store called "user"

- `npx nx generate @schematics/angular:service data-access/core-auth --project=core-auth --no-interactive`

Add the following to your environment (changes depending on how you do environments)

In our case it goes in the libs/shared/assets/{app_name}/app-config.json file

- see [EnvironmentVariables.md](./EnvironmentVariables.md)

```javascript
export const env = {
  firebase: {
    apiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    authDomain: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    databaseURL: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    projectId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    storageBucket: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    messagingSenderId: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  },
};
```

Add the following to the

Above the module add this function

```javascript
import { CoreConfigLoaderService } from '@ttrpg-ui/core/config-loader';

export function getFirebaseConfig(configService: CoreConfigLoaderService) {
  const appConfig = configService.getConfig().value
  return (<any>appConfig).firebase
}
```

And then add this to your providers

```javascript
providers: [
  {
    provide: FIREBASE_OPTIONS,
    deps: [CoreConfigLoaderService],
    useFactory: getFirebaseConfig
  }
],
```
