# Environment Variables

For other things ive tried, see 'Alternate Environment Tries' below.

## Create your app config

- libs/shared/assets/{app_name}/app-config.json

## load your app config into the app's /assets folder

This step may already be done if you needed the shared-assets for something else as well. We need to take everything in the shared/assets and dump it into our /assets folder

Add the following to your host's `project.json`'s `target/build/options/assets` section

```javascript
{
  "glob": "**/*",
  "input": "./libs/shared/assets/",
  "output": "./assets"
}
```

## Modify the host app's bootstrap.ts file

This is so it reads the config on startup.

Original

```javascript
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
```

New

```javascript
(function() {
  // fetch our environment from /assets/{app_name}/app-config.json
  function loadEnvironment () {
      // since it's JavaScript, instantiate the HttpClient manually
      const httpClient = new HttpClient(
        new HttpXhrBackend({
          build: () => new XMLHttpRequest()
        })
      );
      // fetch the json config
      return lastValueFrom(httpClient.get("/assets/host-dnd/app-config.json")).then(function(response: any) {
          // store it in window.appConfig for our service to consume
          (<any>window).appConfig = response
      }, function(err) {
          console.error("Error loading the application environment.", err)
      });
  }

  // manually bootstrap the angular app in the root document
  function bootstrapApplication() {
    platformBrowserDynamic()
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err));
  }

  // load the environment
  // so then bootstraps the app starting the application
  loadEnvironment().then(bootstrapApplication);
}());
```

## create an EnvironmentService

If this is already done, don't do it again

- `npx nx g @nx/angular:lib core/config-loader`
- `npx nx generate @schematics/angular:service --name=data-access/core-config-loader --project=core-config-loader --no-interactive`

## Alternate Environment Tries

So I tried several different things but ultimately they didn't work for one reason or another

- the orriginal environment.ts / environment.{env_name}.ts that angular had
  - this was overused a lot and not optimal. If i had 4 environments I would have to do 4 file replacements in the angular.json (as it used to do by default)
  - this requires me to make a code change and redeploy the configuration
- Why not use APP_INITIALIZER?
  well it didn't really ... work. I can only initialize for the host app but the authentication module would load before it did the app_initializer and firebase wouldnt get it's config at all.

So in the end I decided to load the config in at boostrap time because then you can grab it from the window when you need it and it is ready for the auth service. This lets me define the application one time and override the config with docker/helm if I want to without having to add file replacements based on configuration = x/y/z for angular for every environment added for every app.
