import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  public showErrorMessage = false;
  public hide = true;
  public authForm: FormGroup;

  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) { }
  ngOnInit() {
    this.authForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.authService.login(this.authForm.controls.login.value, this.authForm.controls.password.value)
      .then(user => {
        if (user) {
          this.router.navigate(['/news']);
        } else {
          this.showErrorMessage = true;
        }
      })
  }

  registration() {
    this.router.navigate(['/auth/registration']);
  }

  cancel() {
    this.router.navigate(['/news']);
  }
}
