import { TestBed } from '@angular/core/testing';

import { ToAopManagerGettersSettersService } from './to-aop-manager-getters-setters.service';

describe('ToAopManagerGettersSettersService', () => {
  let service: ToAopManagerGettersSettersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToAopManagerGettersSettersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
