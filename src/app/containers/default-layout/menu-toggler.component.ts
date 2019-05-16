import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { AuthUserService } from "../../core";

@Component({
  selector: 'menu-toggler',
  templateUrl: './menu-toggler.component.html'
})
export class MenuTogglerComponent {

  constructor(
    private authService: AuthUserService,
    private router: Router
  ) { }
  logout(): void {
    this.authService.purgeAuth();
    this.router.navigateByUrl('login');
  }

  showStatus(): void {
    console.log(this.authService.getCurrentAuthUser());
    console.log(this.authService.isAuthenticated);
  }
}