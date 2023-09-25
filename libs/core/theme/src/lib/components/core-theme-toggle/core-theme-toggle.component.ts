import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoreThemeService } from '../../data-access/core-theme.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'ttrpg-ui-core-theme-toggle',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule, MatTooltipModule],
  templateUrl: './core-theme-toggle.component.html',
  styleUrls: ['./core-theme-toggle.component.scss'],
})
export class CoreThemeToggleComponent {
  public isDark$: BehaviorSubject<boolean> = this.coreThemeService.isDark$;

  @Input() stopPropagation = false;

  constructor(private coreThemeService: CoreThemeService) {}

  public toggleDarkMode() {
    this.coreThemeService.toggleDarkMode();
  }

  public handleClick(event: any) {
    if (this.stopPropagation) {
      event.stopPropagation();
    }
  }
}
