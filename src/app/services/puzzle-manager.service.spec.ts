import { TestBed } from '@angular/core/testing';

import { PuzzleManagerService } from './puzzle-manager.service';

describe('PuzzleManagerService', () => {
  let service: PuzzleManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
