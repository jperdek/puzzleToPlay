import { TestBed } from '@angular/core/testing';

import { ZoomMangerService } from './zoom-manger.service';

describe('ZoomMangerService', () => {
  let service: ZoomMangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoomMangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
