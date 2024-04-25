import { TestBed } from '@angular/core/testing';

import { NameSplitterService } from './name-splitter.service';

describe('NameSplitterService', () => {
  let service: NameSplitterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NameSplitterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
