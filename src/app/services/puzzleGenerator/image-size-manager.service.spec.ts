import { TestBed } from '@angular/core/testing';

import { ImageSizeManagerService } from './image-size-manager.service';

describe('ImageSizeManagerService', () => {
  let service: ImageSizeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSizeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
