import { TestBed } from '@angular/core/testing';

import { SetPuzzleAreaOnBoardService } from './set-puzzle-area-on-board.service';

describe('SetPuzzleAreaOnBoardService', () => {
  let service: SetPuzzleAreaOnBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetPuzzleAreaOnBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
