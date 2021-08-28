import { TestBed } from '@angular/core/testing';

import { ShufflePuzzlesService } from './shuffle-puzzles.service';

describe('ShufflePuzzlesService', () => {
  let service: ShufflePuzzlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShufflePuzzlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
