import { TestBed } from '@angular/core/testing';

import { FeatureConfigLoaderService } from './feature-config-loader.service';

describe('FeatureConfigLoaderService', () => {
  let service: FeatureConfigLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeatureConfigLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
