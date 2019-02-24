import { BehaviorSubject } from 'rxjs';

export class AuthMockService {

  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public user = new BehaviorSubject<any>(null);
  
  constructor() {
  }

  login(login: string, password: string) {
   return Promise.resolve(null);
  }

  registration(login: string, password: string) {
    return Promise.resolve(null);
  }

  logout(): void {}

}
