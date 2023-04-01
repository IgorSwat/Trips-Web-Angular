import { TestBed } from '@angular/core/testing';

import { FormStateHandlerService } from './form-state-handler.service';

describe('FormStateHandlerService', () => {
  let service: FormStateHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormStateHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
