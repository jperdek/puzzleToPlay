import { TestBed } from '@angular/core/testing';

import { ZoomManagerService } from './zoom-manager.service';

describe('ZoomMangerService', () => {
  let service: ZoomManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
