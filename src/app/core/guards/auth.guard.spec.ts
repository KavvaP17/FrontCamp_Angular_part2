import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/auth/services/auth/auth.service';
import { AuthMockService } from 'src/app/auth/mock/auth.mock.service';
import { BehaviorSubject } from 'rxjs';

describe('AuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        AuthGuard,
        {provide: AuthService, useClass: AuthMockService}
      ]
    });
  });

  it('should be create', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should redirect to home page if user not autharisated', inject([AuthGuard], (guard: AuthGuard) => {
    guard['authService'].isAuthenticated = new BehaviorSubject<boolean>(false);
    const routerSpy = spyOn(guard['router'], 'navigate');
    guard.canActivate();

    expect(routerSpy).toHaveBeenCalled();
  }));

  it('should return true if user is autharisated', inject([AuthGuard], (guard: AuthGuard) => {
    guard['authService'].isAuthenticated = new BehaviorSubject<boolean>(true);
    const routerSpy = spyOn(guard['router'], 'navigate');
    const res = guard.canActivate();

    expect(routerSpy).not.toHaveBeenCalled();
    expect(res).toBeTruthy();
  }));
});
