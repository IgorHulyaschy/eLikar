import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { RegistrationForm } from '../models/registration/RegistrationForm'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  private registrationUrl = 'http://localhost:3000/api/nurses'
  private http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  public registerNurse(registrationForm: RegistrationForm): Observable<any> {
    console.log(registrationForm)
    return this.http.post(this.registrationUrl, {
      email: registrationForm.email,
      fname: registrationForm.firstName,
      lname: registrationForm.lastName,
      phoneNumber: registrationForm.phone,
      password: registrationForm.password,
      hospitalId: '93cd8b03-9689-4e6f-9bef-14573183de32',
      position: registrationForm.position,
      specialist: registrationForm.specialist
    })
  }
}
