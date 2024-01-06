import { Component, OnInit } from "@angular/core";
import { PatientService } from "../../../services/patient.service";
import { Patient } from "../../../models/patient/patient";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: 'app-patient-overview',
  templateUrl: './patient-overview.component.html',
  styleUrls: ['./patient-overview.component.css',
              '../../home/about-me/about-me.component.css']
})
export class PatientOverviewComponent implements OnInit {

  public patientId: string | undefined | null
  public patient: Patient | undefined
  constructor(private patientService: PatientService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.patientId = params.get('id')
      this.setPatient()
    })
  }

  public goToPatientHistory(): void {
    this.router.navigate(['patient-history', this.patientId])
  }

  private setPatient(): void {
    if (this.patientId) {
      this.patientService.getById(this.patientId).subscribe((res) => {
        this.patient = res
      })
    }
  }
}
