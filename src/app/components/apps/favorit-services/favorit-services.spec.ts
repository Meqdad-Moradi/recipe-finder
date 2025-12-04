import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritServices } from './favorit-services';

describe('FavoritServices', () => {
  let component: FavoritServices;
  let fixture: ComponentFixture<FavoritServices>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritServices]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavoritServices);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
