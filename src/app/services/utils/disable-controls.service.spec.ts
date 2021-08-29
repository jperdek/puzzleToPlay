import { TestBed } from '@angular/core/testing';

import { DisableControlsService } from './disable-controls.service';

describe('DisableControlsService', () => {
  let service: DisableControlsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisableControlsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
