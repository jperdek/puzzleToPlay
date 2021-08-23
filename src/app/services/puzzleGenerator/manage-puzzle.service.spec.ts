import { TestBed } from '@angular/core/testing';

import { ManagePuzzleService } from './manage-puzzle.service';

describe('ManagePuzzleService', () => {
  let service: ManagePuzzleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagePuzzleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
