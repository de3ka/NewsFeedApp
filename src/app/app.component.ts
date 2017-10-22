import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { AuthenticationService, UserService } from './_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isVisible: boolean = true;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private userService: UserService) { }

  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  get currentUser() {
    return this.userService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
