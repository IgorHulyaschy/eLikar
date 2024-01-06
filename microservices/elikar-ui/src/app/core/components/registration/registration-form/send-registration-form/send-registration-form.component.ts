import { Component, OnInit, ViewChild } from "@angular/core";
import { RegistrationService } from "../../../../services/registration.service";
import { PopUpComponent } from "../../../../../shared/components/pop-up.component";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-send-registration-form',
  templateUrl: './send-registration-form.component.html',
  styleUrls: ['./send-registartion.component.css']
})
export class SendRegistrationFormComponent implements OnInit {

  public email: string
  public emailFormGroup: FormGroup


  @ViewChild(PopUpComponent, { static: false })
  private popUpComponent!: PopUpComponent;

  constructor(private registrationService: RegistrationService) {
  }

  public ngOnInit(): void {
    this.emailFormGroup = this.buildRegistrationFormGroup()
  }


  public sendRegistrationForm(): void {
    console.log('test')
    this.email = this.emailFormGroup.controls['email'].value
    console.log(this.emailFormGroup.controls['email'].value)
    this.registrationService.sendRegistrationForm(this.email).subscribe((res) => {
      console.log(res)
      this.popUpComponent.show('Registration form was successfully send!', true)
    })
  }

  private buildRegistrationFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl(this.email, [Validators.email, Validators.min(5), Validators.required])
    })
  }
}