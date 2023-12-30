import { Component } from '@angular/core'
import { AuthService } from "./core/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'elikar-ui'
  private authService: AuthService
  private router: Router
  constructor(authService: AuthService, router: Router) {
    this.authService = authService
    this.router = router
  }

  public logout(): void {
    this.authService.logout()
    this.router.navigate(['/auth'])
  }
}
