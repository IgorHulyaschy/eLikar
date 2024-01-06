import { Component, OnInit } from "@angular/core";
import { PatientService } from '../../../services/patient.service'
import { MedicalHistoryService } from '../../../services/medical-history.sevice'
import { MedicalHistoryRecord } from "../../../models/medical-history/medical-history-record";
import { Patient } from "../../../models/patient/patient";
import { User } from "../../../models/user/user";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-medical-history',
  templateUrl: './medical-history-view.component.html',
  styleUrls: ['./medical-history-view.component.css']
})
export class MedicalHistoryViewComponent implements OnInit{
  public phoneToSearch: string
  public medicalHistoryRecords: MedicalHistoryRecord[]
  public wasSearched = false
  public searchedPatient: Patient
  public isLoading = false
  constructor(
    private patientService: PatientService,
    private medicalHistoryService: MedicalHistoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
      this.getPreselectedParams()
  }

  public getPatientFullName(patient: Patient): string {
    return patient.fname + ' ' + patient.lname
  }

  public getNurseFullName(nurse: User): string {
    return nurse.fname + ' ' + nurse.lname
  }

  public searchByPhone(): void {
    this.isLoading=true
    this.patientService.getByPhone(this.phoneToSearch).subscribe((res) => {
      this.searchedPatient = res.patient
      if (this.searchedPatient) {
        this.getMedicalHistory()
      } else {
        this.endLoading()
      }
    })
  }

  public getMedicalHistory(): void {
    this.medicalHistoryService.getPatientMedicalHistory(this.searchedPatient.id).subscribe((res) => {
      this.medicalHistoryRecords = res
      this.endLoading()
    })
  }

  public shouldSearchButtonBeDisabled(): boolean {
    return false
  }

  private endLoading(): void {
    this.isLoading = false
    this.wasSearched = true
  }

  private getPreselectedParams(): void {
    this.activatedRoute.params.subscribe(params => {
      const objectString = params["id"];
      if (objectString) {
        console.log(objectString)
        const preselectedUserId = objectString
        this.isLoading = true
        this.patientService.getById(preselectedUserId).subscribe((res) => {
          this.searchedPatient = res
          this.phoneToSearch = res.phoneNumber
          this.medicalHistoryService.getPatientMedicalHistory(preselectedUserId).subscribe((res) => {
            this.medicalHistoryRecords = res
            this.endLoading()
          })
        })
      }
    });
  }
}
