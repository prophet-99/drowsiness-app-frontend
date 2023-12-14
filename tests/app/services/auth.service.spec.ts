import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { AuthService } from '../../../src/app/services/auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
    });
    service = TestBed.inject(AuthService);
  });

  test('Should be created', () => {
    expect(service).toBeTruthy();
  });

  test('Should remove credentials from session storage', () => {
    service.deleteFromSessionStorage();
    expect(service.getFromSessionStorage()).toBe('');
  });

  test('Should recover credentials from session storage', () => {
    service.saveInSessionStorage({ username: 'xxx', password: 'xxx' });
    expect(service.getFromSessionStorage()).not.toBeNull();
  });
});
