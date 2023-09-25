import { TestBed } from '@angular/core/testing';

import { CoreLocalStorageService } from './core-local-storage.service';

describe('CoreLocalStorageService', () => {
  let service: CoreLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoreLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
