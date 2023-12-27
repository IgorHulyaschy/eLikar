import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { RegistrationForm } from '../models/registration/RegistrationForm'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  private registrationUrl = 'http://localhost:3000/api/nurses'
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  public registerNurse(registrationForm: RegistrationForm):Observable<any> {
    console.log(registrationForm);
    return this.http.post(this.registrationUrl, {
      email:registrationForm.email,
      fName: registrationForm.firstName,
      lName: registrationForm.lastName,
      phone: registrationForm.phone,
      password: registrationForm.password,
      hospitalId: 1
    });
  }
}
