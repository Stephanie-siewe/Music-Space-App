import { TestBed } from '@angular/core/testing';

import { GetgenreService } from './getgenre.service';

describe('GetgenreService', () => {
  let service: GetgenreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetgenreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
