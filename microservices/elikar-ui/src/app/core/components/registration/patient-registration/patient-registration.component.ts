import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CreatePatientForm } from "../../../models/patient/create-patient-form";
import { PatientService } from "../../../services/patient.service";
import { RegistrationForm } from "../../../models/registration/registration-form";
import { UserService } from "../../../services/user.service";
import { User } from "../../../models/user/user";
import { PopUpComponent } from "../../../../shared/components/pop-up.component";

@Component({
  selector: 'app-patient-registration',
  templateUrl: './patient-registration.component.html',
  styleUrls: [
    './patient-registration.component.css',
    '../registration-form/registration-form.component.css'
  ]
})
export class PatientRegistrationComponent implements OnInit {
  public patientRegistrationFormGroup!: FormGroup
  private createPatientForm = new CreatePatientForm()
  private patientService: PatientService
  private userService: UserService
  private readonly DEFAULT_DIAGNOSIS_ON_REGISTRATION = 'Not defined'

  @ViewChild(PopUpComponent, { static: false })
  private popUpComponent!: PopUpComponent

  constructor(patientService: PatientService, userService: UserService) {
    this.patientService = patientService
    this.userService = userService
  }

  public ngOnInit(): void {
    this.patientRegistrationFormGroup = this.buildPatientRegistrationFormGroup()
  }

  public registerPatient(): void {
    this.createPatientForm = this.buildCreatePatientForm(this.patientRegistrationFormGroup)
    this.patientService.createPatient(this.createPatientForm).subscribe((res) => {
      console.log(res)
      this.popUpComponent.show('Patient was successfully registered', true)
    })
  }

  private buildCreatePatientForm(formGroup: FormGroup): CreatePatientForm {
    const patientForm = new CreatePatientForm()
    patientForm.fname = formGroup.controls['firstName'].value
    patientForm.lname = formGroup.controls['lastName'].value
    patientForm.phoneNumber = this.patientRegistrationFormGroup.controls['phone'].value
    patientForm.diagnosis = this.DEFAULT_DIAGNOSIS_ON_REGISTRATION
    return patientForm
  }

  private buildPatientRegistrationFormGroup(): FormGroup {
    return new FormGroup({
      firstName: new FormControl(this.createPatientForm.fname, [
        Validators.required,
        Validators.min(2)
      ]),
      lastName: new FormControl(this.createPatientForm.lname, [
        Validators.required,
        Validators.min(3)
      ]),
      phone: new FormControl(this.createPatientForm.phoneNumber, [
        Validators.required,
        Validators.pattern('[- +()0-9]{6,}')
      ])
    })
  }
}