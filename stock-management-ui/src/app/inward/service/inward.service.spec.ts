import { TestBed } from '@angular/core/testing';

import { InwardService } from './inward.service';

describe('InwardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InwardService = TestBed.get(InwardService);
    expect(service).toBeTruthy();
  });
});
