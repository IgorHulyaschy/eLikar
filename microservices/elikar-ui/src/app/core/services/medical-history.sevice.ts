import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { MedicalHistory } from "../models/medical-history/medical-history";
import { MedicalHistoryRecord } from "../models/medical-history/medical-history-record";

@Injectable({
  providedIn: 'root'
})
export class MedicalHistoryService {
  constructor(private http: HttpClient) {}

  private patientUrl = 'http://localhost:3000/api/patients'

  public getPatientMedicalHistory(patientId: string): Observable<MedicalHistoryRecord[]> {
    return this.http.get<MedicalHistoryRecord[]>(`${this.patientUrl}/medical-history/${patientId}` )
  }
}
