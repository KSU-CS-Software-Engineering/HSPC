import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';


import { AuthService } from '../_services/auth.service';
import { ToastService } from '../_services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private result;
  loading = false;
  private authorize: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title,
    private toastService: ToastService
  ) { }

  returnUrl: string;

  ngOnInit() {

    this.titleService.setTitle( 'Judgr - Login' );
    this.isAuthenticated();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
    if (this.route.snapshot.queryParams['returnUrl']) {
      this.toastService.toast('Please login to continue', 'fa-exclamation-circle', 'danger', '3000');
    }
  }

  onSubmit(loginForm: NgForm) {
    const email = loginForm.controls['email'];
    const password = loginForm.controls['password'];

    if (email.valid && password.valid) {
      this.login(email.value, password.value);
    }

  }

  login(email: string, password: string): void {
    this.loading = true;

    this.authService.login(email, password).subscribe(
      res => {
        this.authService.setToken(res);
        this.router.navigateByUrl(this.returnUrl);
        this.toastService.toast('Successfully logged in!', 'fa-check-circle', 'success', '3000');
      },
      err => {
        if (err.status === 401) {
          this.toastService.toast('Invalid username or password!', 'fa-exclamation-circle', 'danger', '3000');
        } else {
          this.toastService.toast('Unknown error!', 'fa-question-circle', 'danger', '3000');
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
