import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from './services/auth/auth.service';
import { AuthMockService } from './mock/auth.mock.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ],
      declarations: [ 
        AuthComponent
      ],
      providers: [
        { provide: AuthService, useClass: AuthMockService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('login method should navigate to home page if data is correct', async () => {
    const authSpy = spyOn(component['authService'], 'login').and.returnValue(Promise.resolve({_id: '1'}));
    const routerSpy = spyOn(component['router'], 'navigate');
    await component.login();
    expect(authSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('login method should show error message if data is not correct', async () => {
    await component.login();
    expect(component.showErrorMessage).toBeTruthy();
  });

  it('registration method should navigate to registration page', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.registration();
    expect(routerSpy).toHaveBeenCalled();
  })

  it('cancel method should navigate to home page', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.cancel();
    expect(routerSpy).toHaveBeenCalled();
  })
});
