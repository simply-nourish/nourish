import { TestBed, inject } from '@angular/core/testing';

import { DietaryRestrictionService } from './dietary-restriction.service';

describe('DietaryRestrictionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DietaryRestrictionService]
    });
  });

  it('should be created', inject([DietaryRestrictionService], (service: DietaryRestrictionService) => {
    expect(service).toBeTruthy();
  }));
});
