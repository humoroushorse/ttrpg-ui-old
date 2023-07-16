import { TestBed } from '@angular/core/testing';

import { CoreConfigLoaderService } from './core-config-loader.service';

describe('CoreConfigLoaderService', () => {
  let service: CoreConfigLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreConfigLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
