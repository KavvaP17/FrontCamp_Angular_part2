import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationComponent } from './registration.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth/auth.service';
import { AuthMockService } from '../../mock/auth.mock.service';

describe('RegistrationComponent', () => {
  let component: RegistrationComponent;
  let fixture: ComponentFixture<RegistrationComponent>;

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
        RegistrationComponent
      ],
      providers: [
        { provide: AuthService, useClass: AuthMockService },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('register method should navigate to auth page if data is correct', async () => {
    const authSpy = spyOn(component['authService'], 'registration').and.returnValue(Promise.resolve());
    const routerSpy = spyOn(component['router'], 'navigate');
    await component.register('test', 'test');
    expect(authSpy).toHaveBeenCalled();
    expect(routerSpy).toHaveBeenCalled();
  });

  it('register method should show error message if data is not correct', async () => {
    const authSpy = spyOn(component['authService'], 'registration').and.returnValue(Promise.reject());    
    await component.register('test', 'test');
    expect(authSpy).toHaveBeenCalled();
  });

  it('cancel method should navigate to auth page', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.cancel();
    expect(routerSpy).toHaveBeenCalled();
  })

});
