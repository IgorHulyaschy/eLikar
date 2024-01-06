import { Component, OnInit } from "@angular/core";
import { PatientService } from '../../../services/patient.service'
import { MedicalHistoryService } from '../../../services/medical-history.sevice'
import { MedicalHistoryRecord } from "../../../models/medical-history/medical-history-record";

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history-view.component.html',
  styleUrls: ['./medical-history-view.component.css']
})
export class MedicalHistoryViewComponent implements OnInit{
  public phoneToSearch: string
  public medicalHistoryRecords: MedicalHistoryRecord[]
  constructor(
    private patientService: PatientService,
    private medicalHistoryService: MedicalHistoryService
  ) {}

  public ngOnInit(): void {
    this.medicalHistoryService
      .getPatientMedicalHistory('73a449a7-bf5d-4e80-a71a-8a1c1192496f')
      .subscribe((res) => {
        this.medicalHistoryRecords = res
      })
  }

  public searchByPhone(): void {

  }

  public shouldSearchButtonBeDisabled(): boolean {
    return false
  }
}
