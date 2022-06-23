import { TestBed } from '@angular/core/testing';

import { ToAopTestService } from './to-aop-test.service';

describe('ToAopTestService', () => {
  let service: ToAopTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToAopTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
