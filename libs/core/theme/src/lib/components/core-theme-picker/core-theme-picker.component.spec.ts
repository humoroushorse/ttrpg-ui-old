import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreThemePickerComponent } from './core-theme-picker.component';

describe('CoreThemePickerComponent', () => {
  let component: CoreThemePickerComponent;
  let fixture: ComponentFixture<CoreThemePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreThemePickerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoreThemePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
