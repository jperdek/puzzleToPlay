import { TestBed } from '@angular/core/testing';

import { ToAopManagerInjectService } from './to-aop-manager-inject.service';

describe('ToAopManagerInjectService', () => {
  let service: ToAopManagerInjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToAopManagerInjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
