import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeReview } from './recipe-review';

describe('RecipeReview', () => {
  let component: RecipeReview;
  let fixture: ComponentFixture<RecipeReview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeReview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeReview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
