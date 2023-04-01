import { TestBed } from '@angular/core/testing';

import { TripsInfoService } from './trips-info.service';

describe('TripsInfoService', () => {
  let service: TripsInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripsInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
