import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  public showErrorMessage = false;
  public hide = true;
  public confirmHide = true;
  public authForm: FormGroup;

  constructor(private authService: AuthService,
              private router: Router,
              private fb: FormBuilder) { }
  ngOnInit() {
    this.authForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  register(login: string, password: string) {
    this.authService.registration(login, password)
      .then(() => {
        this.router.navigate(['/auth']);
      })
      .catch((e) => {
        this.showErrorMessage = true;
      })
  }

  cancel() {
    this.router.navigate(['/auth']);
  }

}
