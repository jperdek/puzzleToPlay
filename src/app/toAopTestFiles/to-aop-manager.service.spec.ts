import { TestBed } from '@angular/core/testing';

import { ToAopManagerService } from './to-aop-manager.service';

describe('ToAopManagerService', () => {
  let service: ToAopManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToAopManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
