import { Component, OnInit } from '@angular/core'
import { RegistrationForm } from '../../../models/registration/registration-form'
import { RegistrationService } from '../../../services/registration.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Specialist, SpecialistUtil } from "../../../models/user/specialist";

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  public registrationFormGroup!: FormGroup
  public speciality = 'THERAPIST'

  private registrationForm = new RegistrationForm()
  private confirmPassword!: string
  private registrationService: RegistrationService

  constructor(registrationService: RegistrationService) {
    this.registrationService = registrationService
  }

  public ngOnInit(): void {
    this.registrationFormGroup = this.buildRegistrationFormGroup()
  }

  public register(): void {
    this.registrationForm = this.buildRegistrationForm(this.registrationFormGroup)
    console.log(this.registrationForm)
    console.log(this.registrationFormGroup.valid)
    if (!this.passwordsAreEqual() && this.registrationFormGroup) {
      alert('Password are not equal!')
      return
    }

    if (this.registrationFormGroup.valid) {
      this.registrationService.registerNurse(this.registrationForm).subscribe((res) => {
        console.log(res)
      })
    }
  }

  public getListOfSpecialities(): string[] {
    return Object.keys(Specialist)
  }

  private passwordsAreEqual(): boolean {
    this.confirmPassword = this.registrationFormGroup.controls['confirmPassword'].value
    console.log(this.confirmPassword)
    if (this.registrationForm.password === this.confirmPassword) {
      return true
    }
    return false
  }

  private buildRegistrationForm(formGroup: FormGroup): RegistrationForm {
    const registrationForm = new RegistrationForm()
    registrationForm.email = this.registrationFormGroup.controls['email'].value
    registrationForm.firstName = this.registrationFormGroup.controls['firstName'].value
    registrationForm.lastName = this.registrationFormGroup.controls['lastName'].value
    registrationForm.phone = this.registrationFormGroup.controls['phone'].value
    registrationForm.password = this.registrationFormGroup.controls['password'].value
    registrationForm.specialist = SpecialistUtil.getSpecialist(this.registrationFormGroup.controls['specialist'].value)
    return registrationForm
  }

  private buildRegistrationFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl(this.registrationForm.email, [Validators.email, Validators.min(5)]),
      firstName: new FormControl(this.registrationForm.firstName, [
        Validators.required,
        Validators.min(2)
      ]),
      lastName: new FormControl(this.registrationForm.lastName, [
        Validators.required,
        Validators.min(3)
      ]),
      phone: new FormControl(this.registrationForm.phone, [
        Validators.required,
        Validators.pattern('[- +()0-9]{6,}')
      ]),
      password: new FormControl(this.registrationForm.password, [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword: new FormControl(this.confirmPassword, [
        Validators.required,
        Validators.minLength(6)
      ]),
      specialist: new FormControl(this.registrationForm.specialist)
    })
  }
}
