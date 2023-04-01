import { TestBed } from '@angular/core/testing';

import { ShoppingInfoService } from './shopping-info.service';

describe('ShoppingInfoService', () => {
  let service: ShoppingInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShoppingInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
