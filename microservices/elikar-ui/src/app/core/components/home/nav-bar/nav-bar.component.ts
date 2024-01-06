import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../../services/auth.service'
import { UserService } from "../../../services/user.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  private router: Router
  private authService: AuthService
  private userService: UserService
  constructor(router: Router, authService: AuthService, userService: UserService) {
    this.router = router
    this.authService = authService
    this.userService = userService
  }

  public getUserId(): string {
    return this.userService.getUserId()
  }

  public userAuthenticated(): boolean {
    return this.authService.isLoggedIn()
  }

  public isAdmin(): boolean {
    return this.userService.isAdmin()
  }

  public logout(): void {
    this.authService.logout()
    this.router.navigate(['/auth'])
  }
}
