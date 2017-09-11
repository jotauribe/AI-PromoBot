import { TestBed, inject } from '@angular/core/testing';

import { PromosService } from './promos.service';

describe('PromosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromosService]
    });
  });

  it('should be created', inject([PromosService], (service: PromosService) => {
    expect(service).toBeTruthy();
  }));
});
