import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortInstruction } from './short-instruction';

describe('ShortInstruction', () => {
  let component: ShortInstruction;
  let fixture: ComponentFixture<ShortInstruction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShortInstruction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShortInstruction);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
