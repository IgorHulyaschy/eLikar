import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { CreatePatientForm } from "../models/patient/create-patient-form";
import { Observable } from "rxjs";
import { Patient } from "../models/patient/patient";

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

  public getById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.patientsUrl}/${id}`)
  }
}