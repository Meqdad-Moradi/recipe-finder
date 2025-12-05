import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadytoCook } from './readyto-cook';

describe('ReadytoCook', () => {
  let component: ReadytoCook;
  let fixture: ComponentFixture<ReadytoCook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadytoCook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadytoCook);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
