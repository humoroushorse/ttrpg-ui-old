import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoreThemeToggleComponent } from './core-theme-toggle.component';

describe('CoreThemeToggleComponent', () => {
  let component: CoreThemeToggleComponent;
  let fixture: ComponentFixture<CoreThemeToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreThemeToggleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CoreThemeToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
