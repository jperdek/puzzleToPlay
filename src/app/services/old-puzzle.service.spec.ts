import { TestBed } from '@angular/core/testing';

import { OldPuzzleService } from './old-puzzle.service';

describe('OldPuzzleService', () => {
  let service: OldPuzzleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OldPuzzleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
