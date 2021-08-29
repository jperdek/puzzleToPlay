import { TestBed } from '@angular/core/testing';

import { RandomUtilsService } from './random-utils.service';

describe('RandomUtilsService', () => {
  let service: RandomUtilsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RandomUtilsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
