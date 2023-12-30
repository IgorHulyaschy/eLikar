import { Component } from '@angular/core'
import { AuthService } from "./core/services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'elikar-ui'
  private authService: AuthService
  constructor(authService: AuthService) {
    this.authService = authService
  }

  public logout(): void {
    this.authService.logout()
  }
}
