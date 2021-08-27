import { TestBed } from '@angular/core/testing';

import { ManipulationHandlerService } from './manipulation-handler.service';

describe('ManipulationHandlerService', () => {
  let service: ManipulationHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManipulationHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
