import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate() {
    
    const isAuthenticated = this.authService.isAuthenticated.getValue();
    
      if(!isAuthenticated) {
        this.router.navigate(['news']);
      }
      return isAuthenticated;
  }

}
