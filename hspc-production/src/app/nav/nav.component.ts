import { Component, OnInit } from '@angular/core';

import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {

  }


  loginLink(): string {
    return this.authService.isLoggedIn() ? 'logout' : 'login';
  }

  loginText(): string {
    return this.authService.isLoggedIn() ? 'Logout' : 'Login';
  }

  showDashboard(): boolean {
    return this.authService.isLoggedIn();
  }

}
