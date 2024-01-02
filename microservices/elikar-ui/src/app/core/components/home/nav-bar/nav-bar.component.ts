import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../../../services/auth.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  private router: Router
  private authService: AuthService
  constructor(router: Router, authService: AuthService) {
    this.router = router
    this.authService = authService
  }

  public userAuthenticated(): boolean {
    return this.authService.isLoggedIn()
  }

  public logout(): void {
    this.authService.logout()
    this.router.navigate(['/auth'])
  }
}
