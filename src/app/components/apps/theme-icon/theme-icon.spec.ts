import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeIcon } from './theme-icon';

describe('ThemeIcon', () => {
  let component: ThemeIcon;
  let fixture: ComponentFixture<ThemeIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThemeIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
