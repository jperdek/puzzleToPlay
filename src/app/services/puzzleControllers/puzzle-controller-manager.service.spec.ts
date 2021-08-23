import { TestBed } from '@angular/core/testing';

import { PuzzleControllerManagerService } from './puzzle-controller-manager.service';

describe('PuzzleControllerManagerService', () => {
  let service: PuzzleControllerManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleControllerManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
