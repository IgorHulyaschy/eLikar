import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthenticationForm } from '../../models/authentication/authentication-form'
import { AuthService } from '../../services/auth.service'
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  public authenticationFormGroup!: FormGroup
  public loginAsAdmin = false

  private authenticationForm = new AuthenticationForm()
  private authenticationService: AuthService
  constructor(authenticationService: AuthService) {
    this.authenticationService = authenticationService
  }

  public ngOnInit(): void {
    this.authenticationFormGroup = this.buildAuthenticationFormGroup()
  }

  public authenticate(): void {
    if (this.authenticationFormGroup.valid) {
      this.authenticationForm = this.buildAuthenticationForm()
      this.authenticationService
        .getAuthenticationToken(this.authenticationForm, this.loginAsAdmin)
        .subscribe((res) => {
          const token = Object.values(res)[0]
          console.log(token)
          this.authenticationService.authenticateWithToken(token as string)
        })
    }
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
        Validators.minLength(6)
      ])
    })
  }
}
