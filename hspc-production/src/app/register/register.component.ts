import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { Title } from '@angular/platform-browser';

import { AuthService } from '../_services/auth.service';
import { ToastService } from '../_services/toast.service';

import * as UIkit from 'uikit';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  loading = false;

  constructor(private authService: AuthService, private router: Router, private title: Title, private toastService: ToastService) { }

  ngOnInit() {
    this.isAuthenticated();
    this.title.setTitle( 'Judgr - Register' );

  }


  onSubmit(registerForm: NgForm) {
    const email = registerForm.controls['email'];
    const password = registerForm.controls['password'];
    const confirmPassword = registerForm.controls['confirmPassword'];
    // validate password and confirm password
    if (email.valid && password.valid && confirmPassword.valid) {
      this.register(email.value, password.value, registerForm);
    }
  }



  register(email: string, password: string, registerForm: NgForm) {
    this.loading = true;
    this.authService.register(email, password).subscribe(
      res => {
        this.authService.setToken(res);
        this.router.navigateByUrl('dashboard');
        this.toastService.toast('Successfully registered!', 'fa-check-circle', 'success', '3000');
      },
      err => {
        if (err.status === 400) {
          registerForm.controls['password'].reset();
          registerForm.controls['confirmPassword'].reset();
          // todo add more specific error responses (for loop through error messages to make UIkit notifications)
          for (const error of err.error.errors) {
            switch (error.code) {
              case 'DuplicateUserName': {
                this.toastService.toast('Username already in use!', 'fa-exclamation-circle', 'danger', '3000');
                break; // break the last case only to not show default case
              }
              case 'default': {
                this.toastService.toast('Issue registering!', 'fa-exclamation-circle', 'danger', '3000');
              }
            }
          }

        } else {
          this.toastService.toast('Unknown error!', 'question-mark', 'danger', '3000');
        }
        this.loading = false;
      });
  }


  isAuthenticated() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }


}
