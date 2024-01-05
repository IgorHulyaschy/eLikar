import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { CreatePatientForm } from "../models/patient/create-patient-form";
import { Observable } from "rxjs";
import { Patient } from "../models/patient/patient";
import { PatientDto } from "../models/patient/patient-dto";
import { CreatePatientResponse } from "../models/patient/create-patient-response";

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  private patientsUrl = 'http://localhost:3000/api/patients'
  private http: HttpClient

  constructor(http: HttpClient) {
    this.http = http
  }

  public createPatient(form: CreatePatientForm): Observable<CreatePatientResponse> {
    return this.http.post<CreatePatientResponse>(this.patientsUrl, form)
  }

  public getById(id: string): Observable<Patient> {
    return this.http.get<Patient>(`${this.patientsUrl}/${id}`)
  }

  public getByPhone(phone: string): Observable<PatientDto> {
    return this.http.get<PatientDto>(`${this.patientsUrl}/phone/${phone}`)
  }
}