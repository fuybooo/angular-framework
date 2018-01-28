import { TestBed, inject } from '@angular/core/testing';

import { TableTreeService } from './table-tree.service';

describe('TableTreeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableTreeService]
    });
  });

  it('should be created', inject([TableTreeService], (service: TableTreeService) => {
    expect(service).toBeTruthy();
  }));
});
