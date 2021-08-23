import { TestBed } from '@angular/core/testing';

import { HelpPuzzleServiceService } from './help-puzzle-service.service';

describe('HelpPuzzleServiceService', () => {
  let service: HelpPuzzleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HelpPuzzleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
