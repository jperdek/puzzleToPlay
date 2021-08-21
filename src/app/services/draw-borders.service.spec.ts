import { TestBed } from '@angular/core/testing';

import { DrawBordersService } from './draw-borders.service';

describe('DrawBordersService', () => {
  let service: DrawBordersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DrawBordersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
