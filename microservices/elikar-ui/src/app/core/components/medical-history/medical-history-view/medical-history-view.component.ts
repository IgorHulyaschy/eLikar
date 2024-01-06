import { Component, Input, OnInit } from "@angular/core";
import { PatientService } from '../../../services/patient.service'
import { MedicalHistoryService } from '../../../services/medical-history.sevice'
import { MedicalHistoryRecord } from "../../../models/medical-history/medical-history-record";
import { Patient } from "../../../models/patient/patient";
import { User } from "../../../models/user/user";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history-view.component.html',
  styleUrls: ['./medical-history-view.component.css']
})
export class MedicalHistoryViewComponent implements OnInit{
  @Input()
  public medicalHistoryRecords: MedicalHistoryRecord[]
  @Input()
  public wasSearched = false
  @Input()
  public isLoading = false
  @Input()
  public nurse: User
  constructor(private router: Router) {}

  public ngOnInit(): void {

  }

  public getPatientFullName(patient: Patient): string {
    return patient.fname + ' ' + patient.lname
  }

  public navigateToPatientHistory(patientId: string): void {
    this.router.navigate(['/patient-history', patientId])
  }

  public navigateToNurseHistory(nurseId: string): void {
    if (this.nurse) {
      this.router.navigate(['/nurse-history', this.nurse.id])
    }
    this.router.navigate(['/nurse-history', nurseId])
  }

  public getNurseFullName(nurse: User): string {
    if (this.nurse) {
      return this.nurse.fname + ' ' + this.nurse.lname
    }
    return nurse.fname + ' ' + nurse.lname
  }
}
