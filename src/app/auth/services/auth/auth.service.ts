import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading/loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuthenticated = new BehaviorSubject<boolean>(false);
  public user = new BehaviorSubject<any>(null);
  private serverURL = 'http://localhost:3000/';
  
  constructor(private loadingService: LoadingService) {
  }

  login(login: string, password: string) {
    this.loadingService.setIsLoadingValue(false);
    const url = `${this.serverURL}auth/login`;
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(
        {
          login,
          password
        }
      )
    })
    .then(response => response.json())
    .then((res) => {
      this.loadingService.setIsLoadingValue(true);
      this.user.next(res);
      this.isAuthenticated.next(true);
      return res;
    })
    .catch(() => {
      this.isAuthenticated.next(false);
      this.loadingService.setIsLoadingValue(true);
      return;
    }); 
  }

  registration(login: string, password: string) {
    this.loadingService.setIsLoadingValue(false);
    const url = `${this.serverURL}auth/register`;
    return fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(
        {
          login,
          password
        }
      )
    })
    .then((res) => {
      this.loadingService.setIsLoadingValue(true);
    })
    .catch(() => {
      this.loadingService.setIsLoadingValue(true);
    })
  }

  logout(): void {
    this.loadingService.setIsLoadingValue(false);
    this.user.next(null);
    this.isAuthenticated.next(false);
    const url = `${this.serverURL}auth/logout`;
    fetch(url)
      .then(() => {
        this.loadingService.setIsLoadingValue(true);
      })
      .catch(() => {
        this.loadingService.setIsLoadingValue(true);
      })
  }

}
