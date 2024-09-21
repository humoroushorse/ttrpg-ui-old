import { OverlayContainer } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreLocalStorageService } from '@ttrpg-ui/core/local-storage';

export interface IAppTheme {
  theme: string;
  viewValue: string;
  defaultContrast: string;
  isDark: boolean;
}
@Injectable({
  providedIn: 'root',
})
export class CoreThemeService {
  public themes: IAppTheme[] = [
    {
      theme: 'dnd-dark-theme',
      viewValue: 'DnD Dark Theme',
      defaultContrast: 'black',
      isDark: true,
    },
    {
      theme: 'dnd-light-theme',
      viewValue: 'DnD Light Theme',
      defaultContrast: 'white',
      isDark: false,
    },
  ];

  private specialThemes: IAppTheme[] = [
    // {
    //   theme: 'konami-pink-dk-theme',
    //   viewValue: 'Konami Theme',
    //   defaultContrast: 'black',
    //   isDark: true,
    // },
    // {
    //   theme: 'konami-pink-lt-theme',
    //   viewValue: 'Konami Theme',
    //   defaultContrast: 'white',
    //   isDark: false,
    // },
  ];

  private defaultTheme: IAppTheme = this.themes[0];

  public isDark$ = new BehaviorSubject(this.defaultTheme.isDark);
  public tempTheme$ = new BehaviorSubject<IAppTheme | undefined>(undefined);
  public activeTheme$ = new BehaviorSubject<IAppTheme>(this.defaultTheme);

  private LOCAL_STORAGE_KEY = ['core', 'CoreThemeService'];

  constructor(private overlayContainer: OverlayContainer, private coreLocalStorageService: CoreLocalStorageService) {
    const storageTheme = this.coreLocalStorageService.get([...this.LOCAL_STORAGE_KEY, 'theme', 'activeTheme$']);
    if (storageTheme) {
      let _theme = this._getThemeByName(this.themes, storageTheme);
      if (!_theme) {
        _theme = this._getThemeByName(this.specialThemes, storageTheme);
      }
      if (_theme) {
        const currentTheme = _theme.theme.split('-');
        this.isDark$.next(currentTheme[currentTheme.length - 2] === 'dark' ? true : false);
        this.activeTheme$.next(_theme);
      }
    }

    this._updateOverlay();
  }

  public konami(): void {
    this.pickTheme(this.specialThemes[0]);
  }

  public allThemes(): Observable<IAppTheme[]> {
    return this.isDark$.pipe(
      map((isDark) => {
        return this.themes.filter((theme) => theme.isDark === isDark);
      })
    );
  }

  public setTempColor(theme: IAppTheme): void {
    if (!this.tempTheme$.value) {
      this.tempTheme$.next(this.activeTheme$.value);
    }
    this._updateAppTheme(theme);
  }

  public removeTempColor(): void {
    if (this.tempTheme$.value) {
      this._updateAppTheme(this.tempTheme$.value);
      this.tempTheme$.next(undefined);
    }
  }

  public pickTheme(theme: IAppTheme): void {
    this._updateAppTheme(theme);
    if (this.tempTheme$.value) {
      this.tempTheme$.next(undefined);
    }
  }

  public toggleDarkMode(isDark?: boolean) {
    if (isDark) {
      this.isDark$.next(isDark);
    } else {
      this.isDark$.next(!this.isDark$.value);
    }
    const currentTheme = this.activeTheme$.value.theme.split('-');
    currentTheme[currentTheme.length - 2] = this.isDark$.value ? 'dark' : 'light';
    this._updateAppTheme(this._getThemeByName([...this.themes, ...this.specialThemes], currentTheme.join('-')));
  }

  private _getThemeByName(themeList: IAppTheme[], themeName: string) {
    return themeList.find((theme) => theme.theme === themeName);
  }

  private _updateAppTheme(_theme: IAppTheme | undefined) {
    if (!_theme) {
      _theme = this.defaultTheme;
    }
    this.coreLocalStorageService.upsert([...this.LOCAL_STORAGE_KEY, 'theme', 'activeTheme$'], _theme.theme);
    this.activeTheme$.next(_theme);

    this._updateOverlay(_theme);
  }

  // set the overlay theme (say drop-downs)
  private _updateOverlay(theme?: IAppTheme) {
    const _theme = theme ? theme : this.activeTheme$.value;

    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(overlayContainerClasses).filter(
      (item: string) => item.includes('-theme') && !item.includes('router')
    );
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(_theme.theme);
  }
}
