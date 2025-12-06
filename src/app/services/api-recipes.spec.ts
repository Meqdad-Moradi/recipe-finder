import { TestBed } from '@angular/core/testing';

import { ApiRecipes } from './api-recipes';

describe('ApiRecipes', () => {
  let service: ApiRecipes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiRecipes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
