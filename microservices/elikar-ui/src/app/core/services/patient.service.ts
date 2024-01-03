import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { CreatePatientForm } from "../models/patient/create-patient-form";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientsUrl = 'http://localhost:3000/api/patients'
  private http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  public createPatient(form: CreatePatientForm): Observable<any> {
    return this.http.post(this.patientsUrl, form)
  }
}