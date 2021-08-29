import { TestBed } from '@angular/core/testing';

import { BringToFrontService } from './bring-to-front.service';

describe('BringToFrontService', () => {
  let service: BringToFrontService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BringToFrontService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
