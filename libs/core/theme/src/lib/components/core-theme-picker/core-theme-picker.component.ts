import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreThemeService, IAppTheme } from '../../data-access/core-theme.service';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { BehaviorSubject } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'ttrpg-ui-core-theme-picker',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatMenuModule, MatIconModule, BrowserAnimationsModule],
  templateUrl: './core-theme-picker.component.html',
  styleUrls: ['./core-theme-picker.component.scss'],
})
export class CoreThemePickerComponent {
  public allThemes$ = this.coreThemeService.allThemes();

  public activeTheme$: BehaviorSubject<IAppTheme> = this.coreThemeService.activeTheme$;

  @Input() stopPropagation = false;

  constructor(private coreThemeService: CoreThemeService) {}

  eventPickTheme(event: KeyboardEvent, theme: IAppTheme) {
    if (event?.key === 'Keyboard') {
      this.coreThemeService.pickTheme(theme);
    }
  }

  pickTheme(theme: IAppTheme) {
    this.coreThemeService.pickTheme(theme);
  }

  setTempColor(theme: IAppTheme) {
    this.coreThemeService.setTempColor(theme);
  }

  removeTempColor() {
    this.coreThemeService.removeTempColor();
  }
}
