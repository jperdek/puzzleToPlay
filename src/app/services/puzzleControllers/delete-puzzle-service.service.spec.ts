import { TestBed } from '@angular/core/testing';

import { DeletePuzzleServiceService } from './delete-puzzle-service.service';

describe('DeletePuzzleServiceService', () => {
  let service: DeletePuzzleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeletePuzzleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
