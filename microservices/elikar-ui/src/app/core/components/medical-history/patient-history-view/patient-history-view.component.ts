import { Component, OnInit } from "@angular/core";
import { Patient } from "../../../models/patient/patient";
import { MedicalHistoryRecord } from "../../../models/medical-history/medical-history-record";
import { PatientService } from "../../../services/patient.service";
import { MedicalHistoryService } from "../../../services/medical-history.sevice";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-patient-history-view',
  templateUrl: './patient-history-view.component.html',
  styleUrls: ['./patient-history-view.component.css',
              '../medical-history-view/medical-history-view.component.css']
})
export class PatientHistoryViewComponent implements OnInit {
  public searchedPatient: Patient
  public phoneToSearch: string
  public isLoading = false
  public wasSearched = false
  public medicalHistoryRecords: MedicalHistoryRecord[]

  constructor(private patientService: PatientService,
              private medicalHistoryService: MedicalHistoryService,
              private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.getPreselectedParams()
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

  public shouldSearchButtonBeDisabled(): boolean {
    return false
  }

  private endLoading(): void {
    this.isLoading = false
    this.wasSearched = true
  }
}