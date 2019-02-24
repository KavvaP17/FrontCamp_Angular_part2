import { TestBed, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {Response, ResponseOptions} from '@angular/http';

describe('AuthService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    });
  });


  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should login', inject([AuthService], async(service: AuthService) => {
    const mockResponceData = {
      _id: '1',
      local: {
        login: 'login',
        password: 'password'
      }
    }

    const mockResponce = new Response(new ResponseOptions({
      body: JSON.stringify(mockResponceData)
    }))

    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve(mockResponce));


    await service.login('test', 'test');
    
    expect(service.user.getValue()).toBeTruthy();
    expect(service.isAuthenticated.getValue()).toBeTruthy();
    expect(fetchSpy).toHaveBeenCalled();
  }));

  it('should login', inject([AuthService], async(service: AuthService) => {
    const mockResponceData = {
      _id: '1',
      local: {
        login: 'login',
        password: 'password'
      }
    }

    const mockResponce = new Response(new ResponseOptions({
      body: JSON.stringify(mockResponceData)
    }))

    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.reject(mockResponce));


    await service.login('test', 'test');
    
    expect(service.user.getValue()).toBeFalsy();
    expect(service.isAuthenticated.getValue()).toBeFalsy();
    expect(fetchSpy).toHaveBeenCalled();
  }));

  it('should logout', inject([AuthService], async(service: AuthService) => {
    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve());

    await service.logout();
    
    expect(service.user.getValue()).toBeFalsy();
    expect(service.isAuthenticated.getValue()).toBeFalsy();
    expect(fetchSpy).toHaveBeenCalled();
  }));

  it('should registred', inject([AuthService], async(service: AuthService) => {
    const fetchSpy = spyOn(window, 'fetch').and.returnValue(Promise.resolve());

    await service.registration('test', 'test');
    expect(fetchSpy).toHaveBeenCalled();
  }));

});
