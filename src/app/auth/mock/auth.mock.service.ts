import { BehaviorSubject } from 'rxjs';

const mockUser = {
  _id: '1',
  local: {
    login: 'login',
    password: 'password'
  }
}

export class AuthMockService {

  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public user = new BehaviorSubject<any>(mockUser);
  
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
