import { TestBed } from '@angular/core/testing';

import { AspectjsManagerService } from './aspectjs-manager.service';

describe('AspectjsManagerService', () => {
  let service: AspectjsManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AspectjsManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
