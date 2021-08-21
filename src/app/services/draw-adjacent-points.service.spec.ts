import { TestBed } from '@angular/core/testing';

import { DrawAdjacentPointsService } from './draw-adjacent-points.service';

describe('DrawAdjacentPointsService', () => {
  let service: DrawAdjacentPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawAdjacentPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
