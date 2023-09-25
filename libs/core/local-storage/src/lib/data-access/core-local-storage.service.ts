import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CoreLocalStorageService {
  private localStorageKey = 'user-config';
  public currentConfig$ = new BehaviorSubject(JSON.parse(String(localStorage.getItem(this.localStorageKey))) || {});

  // constructor() {}

  public logout(): void {
    localStorage.removeItem(this.localStorageKey);
  }

  private _get(path: string[]): any[] {
    let config = this.currentConfig$.value; // a moving reference to internal objects within obj
    const len = path.length;
    for (let i = 0; i < len - 1; i++) {
      const elem = path[i];
      if (!config[elem]) config[elem] = {};
      config = config[elem];
    }
    return [config, len];
  }

  public get(path: string[]) {
    let config;
    let len;
    [config, len] = this._get(path); // eslint-disable-line prefer-const
    // return found value
    return config[path[len - 1]];
  }

  public upsert(path: string[], data: any): void {
    let config;
    let len;
    [config, len] = this._get(path); // eslint-disable-line prefer-const
    // upsert nested data
    config[path[len - 1]] = data;
    this.updateLocalStorage();
  }

  public remove(path: string[]): void {
    let config;
    let len;
    [config, len] = this._get(path); // eslint-disable-line prefer-const
    // delete nested data
    delete config[path[len - 1]];
    this.updateLocalStorage();
  }

  private updateLocalStorage(config = this.currentConfig$.value): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(config));
  }
}
