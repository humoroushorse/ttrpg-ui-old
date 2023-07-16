import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from, lastValueFrom, map } from 'rxjs';
import { AppConfigsEnum } from '../models/config.models';

@Injectable({
  providedIn: 'root',
})
export class CoreConfigLoaderService {
  private $config = new BehaviorSubject<any>(null);

  public getConfig<T>(): BehaviorSubject<T> {
    return <BehaviorSubject<T>>this.$config;
  }

  // This is the method you want to call at bootstrap
  // Important: It should return a Promise
  public async init<T>(appName: AppConfigsEnum) {
    return await lastValueFrom(
      from(
        // assets is defined in the angular json as a glob
        fetch(`./assets/${appName}/app-config.json`).then(function (response) {
          console.log(response);
          return response.json();
        })
      ).pipe(
        map((config) => {
          console.log('ik-CoreConfigLoaderService::config', config);
          this.$config.next(config);
          return <T>config;
        })
      )
    );
  }
}
