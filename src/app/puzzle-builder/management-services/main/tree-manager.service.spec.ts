import { TestBed } from '@angular/core/testing';

import { TreeManagerService } from './tree-manager.service';

describe('TreeManagerService', () => {
  let service: TreeManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TreeManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
