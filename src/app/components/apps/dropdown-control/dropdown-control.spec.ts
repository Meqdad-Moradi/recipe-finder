import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownControl } from './dropdown-control';

describe('DropdownControl', () => {
  let component: DropdownControl;
  let fixture: ComponentFixture<DropdownControl>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownControl]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownControl);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
