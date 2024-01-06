import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MedicalHistory } from "../models/medical-history/medical-history";
import { MedicalHistoryRecord } from "../models/medical-history/medical-history-record";
import { NurseMedicalHistory } from "../models/medical-history/nurse-medical-history";

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {
  constructor(private http: HttpClient) {}

  private patientUrl = 'http://localhost:3000/api/patients'
  private hospitalUrl = 'http://localhost:3000/api/hospital'

  public getPatientMedicalHistory(patientId: string): Observable<MedicalHistoryRecord[]> {
    return this.http.get<MedicalHistoryRecord[]>(`${this.patientUrl}/medical-history/${patientId}` )
  }

  public getNurseMedicalHistory(nurseId: string): Observable<NurseMedicalHistory> {
    return this.http.get<NurseMedicalHistory>(`${this.hospitalUrl}/nurses/history/${nurseId}` )
  }
}
