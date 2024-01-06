import { Component, OnInit, ViewChild } from "@angular/core";
import { Patient } from "../../../models/patient/patient";
import { PatientService } from "../../../services/patient.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { UserService } from "../../../services/user.service";
import { QueueService } from "../../../services/queue.service";
import { User } from "../../../models/user/user";
import { SlotSetDone } from "../../../models/queue/slot-set-done";
import { PopUpComponent } from "../../../../shared/components/pop-up.component";

@Component({
  selector: 'app-patient-reception',
  templateUrl: './patient-reception.component.html',
  styleUrls: ['./patient-reception.component.css']
})
export class PatientReceptionComponent implements OnInit {

  public patientId: string
  public patient: Patient
  public nurse: User
  public date: string
  public queueId: string
  public diagnosis = ''
  public notes = ''


  @ViewChild(PopUpComponent, { static: false })
  private popUpComponent!: PopUpComponent;
  constructor(private patientService: PatientService,
              private route: ActivatedRoute,
              private userService: UserService,
              private queueService: QueueService,
              private router: Router) {
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.patientId = params.get('patientId')
      this.queueId = params.get('queueId')
      this.setPatient()
      this.setNurse()
      this.date = new Date().toISOString().substring(0, 10)
    })
  }

  public getPatientFullName(): string {
    return this.patient.fname + ' ' + this.patient.lname
  }

  public getNurseFullName(): string {
    return this.nurse.fname + ' ' + this.nurse.lname
  }

  public submit(): void {
    const slotSetDone = new SlotSetDone()
    slotSetDone.queueId = this.queueId
    slotSetDone.diagnosis = this.diagnosis
    slotSetDone.nurseNotes = this.notes
    this.queueService.slotSetDone(slotSetDone).subscribe((res) => {
      this.popUpComponent.show('Submitted successfully', true)
      setTimeout(() => {
        this.router.navigate(['queue-view'])
      },1000)
    })
  }

  public shouldSubmitButtonBeDisabled(): boolean {
    return this.notes.length <= 0 && this.diagnosis.length <= 2
  }

  private setPatient(): void {
    if (this.patientId) {
      this.patientService.getById(this.patientId).subscribe((res) => {
        this.patient = res
        console.log(this.patient)
      })
    }
  }

  private setNurse(): void {
    this.userService.getInfoAboutMe().subscribe((nurse) => {
      this.nurse = nurse
    })
  }
}
