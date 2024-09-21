import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

(function () {
  // fetch our environment from /assets/{app_name}/app-config.json
  function loadEnvironment() {
    // since it's JavaScript, instantiate the HttpClient manually
    const httpClient = new HttpClient(
      new HttpXhrBackend({
        build: () => new XMLHttpRequest(),
      })
    );
    // fetch the json config
    return lastValueFrom(httpClient.get('/assets/host-dnd/app-config.json')).then(
      function (response: any) {
        // store it in window.appConfig for our service to consume
        //    see libs/core/config-loader
        //    see docs/EnvironmentVariables.md
        (<any>window).appConfig = response;
      },
      function (err) {
        console.error('Error loading the application environment.', err);
      }
    );
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
})();
