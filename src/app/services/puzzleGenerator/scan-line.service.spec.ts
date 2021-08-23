import { TestBed } from '@angular/core/testing';

import { ScanLineService } from './scan-line.service';

describe('ScanLineService', () => {
  let service: ScanLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
