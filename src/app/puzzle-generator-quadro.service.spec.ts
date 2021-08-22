import { TestBed } from '@angular/core/testing';

import { PuzzleGeneratorQuadroService } from './puzzle-generator-quadro.service';

describe('PuzzleGeneratorQuadroService', () => {
  let service: PuzzleGeneratorQuadroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleGeneratorQuadroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
