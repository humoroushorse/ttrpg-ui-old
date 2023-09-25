import { Injectable, Signal, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreConfigLoaderService {
  // See docs/EnvironmentVariables.md

  private appConfig$ = signal<any>({});

  constructor() {
    this.appConfig$.set((<any>window).appConfig);
    (<any>window).appConfig = undefined;
  }

  public getAppConfig<T>(): Signal<T> {
    // See docs/EnvironmentVariables.md
    return this.appConfig$.asReadonly() as Signal<T>;
  }
}
