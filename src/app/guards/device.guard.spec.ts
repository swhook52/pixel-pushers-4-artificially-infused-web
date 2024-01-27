import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { DeviceGuard } from './device.guard';

describe('DeviceGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => DeviceGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
