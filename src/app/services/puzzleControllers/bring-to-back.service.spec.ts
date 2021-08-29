import { TestBed } from '@angular/core/testing';

import { BringToBackService } from './bring-to-back.service';

describe('BringToBackService', () => {
  let service: BringToBackService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BringToBackService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
