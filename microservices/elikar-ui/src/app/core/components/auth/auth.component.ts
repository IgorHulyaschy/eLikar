import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationForm } from '../../models/authentication/authentication-form'
import { AuthService } from '../../services/auth.service'
import { HttpErrorResponse } from '@angular/common/http'
import { Router } from '@angular/router'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public authenticationFormGroup!: FormGroup
  public loginAsAdmin = false
  public errorMessageText = ''

  private authenticationForm = new AuthenticationForm()
  private authenticationService: AuthService
  private router: Router
  private readonly WRONG_CREDENTIALS_ERROR = 'WRONG_CREDENTIALS'
  constructor(authenticationService: AuthService, router: Router) {
    this.authenticationService = authenticationService
    this.router = router
  }

  public ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate(['/home'])
    }
    this.authenticationFormGroup = this.buildAuthenticationFormGroup()
  }

  public authenticate(): void {
    if (this.authenticationFormGroup.valid) {
      this.authenticationForm = this.buildAuthenticationForm()
      this.authenticationService
        .getAuthenticationToken(this.authenticationForm, this.loginAsAdmin)
        .subscribe(
          (res) => {
            const token = Object.values(res)[0]
            this.authenticationService.authenticateWithToken(token as string, this.loginAsAdmin)
            this.router.navigate(['/home'])
          },
          (error) => {
            this.handleError(error)
          }
        )
    }
  }

  public resetErrorMessage(): void {
    this.errorMessageText = ''
  }

  private handleError(error: HttpErrorResponse): any {
    console.error(error)
    if (error.error.error === this.WRONG_CREDENTIALS_ERROR) {
      this.handleErrorWrongCredentials()
    } else {
      this.handleCommonError()
    }
  }

  private handleErrorWrongCredentials(): void {
    this.errorMessageText = 'Your email or password is wrong'
  }

  private handleCommonError(): void {
    this.errorMessageText = 'Error occurred. Try later'
  }

  private buildAuthenticationForm(): AuthenticationForm {
    const authForm = new AuthenticationForm()
    authForm.email = this.authenticationFormGroup.controls['email'].value
    authForm.password = this.authenticationFormGroup.controls['password'].value
    return authForm
  }

  private buildAuthenticationFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl(this.authenticationForm.email, [Validators.min(5), Validators.email]),
      password: new FormControl(this.authenticationForm.password, [
        Validators.required,
        Validators.minLength(4)
      ])
    })
  }
}
