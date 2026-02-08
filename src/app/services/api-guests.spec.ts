import { TestBed } from '@angular/core/testing';

import { ApiGuests } from './api-guests';

describe('ApiGuests', () => {
  let service: ApiGuests;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiGuests);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
