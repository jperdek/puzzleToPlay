import { TestBed } from '@angular/core/testing';
import { PuzzleControllerManagerService2 } from './puzzle-controller-manager2.service';

describe('PuzzleControllerManagerService', () => {
  let service: PuzzleControllerManagerService2;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuzzleControllerManagerService2);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
