import { TestBed } from '@angular/core/testing';

import { ApiFavorites } from './api-favorites';

describe('ApiFavorites', () => {
  let service: ApiFavorites;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFavorites);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
