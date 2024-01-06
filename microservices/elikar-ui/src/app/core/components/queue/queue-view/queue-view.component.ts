import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { QueueService } from "../../../services/queue.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NurseService } from "../../../services/nurse.service";
import { User } from "../../../models/user/user";
import { Specialist } from "../../../models/user/specialist";
import { DateInterval } from "../../../models/queue/date-interval";
import { UserService } from "../../../services/user.service";
import { Observable } from "rxjs";
import { Patient } from "../../../models/patient/patient";
import { PatientService } from "../../../services/patient.service";
import { PreselectedQueueState } from "../../../models/queue/preselected-queue-state";
import { PopUpComponent } from "../../../../shared/components/pop-up.component";

@Component({
  selector: "app-queue-view",
  templateUrl: "./queue-view.component.html",
  styleUrls: ["./queue-view.component.css"]
})
export class QueueViewComponent implements OnInit {

  public specialities: Specialist[];
  public filteredNurses: User[];
  public selectedSpeciality: Specialist;
  public selectedNurseId: string;
  public selectedDateStr: string;
  public dateInterval: DateInterval;
  public patients: Patient[];
  public patientsIndexes: number[];
  public patientsLoadStatuses: boolean[];
  public wasDataFetched = false;
  public isLoading: boolean;

  public nurse: User
  public nurseLoading: boolean

  @ViewChild(PopUpComponent, { static: false })
  private popUpComponent!: PopUpComponent;

  private nurses: User[];
  private queueService: QueueService;
  private nurseService: NurseService;
  private userService: UserService;
  private patientService: PatientService;
  private maxPatientsAtDay = 6;
  private router: Router;
  private activatedRoute: ActivatedRoute;
  private preselectedParams: PreselectedQueueState;

  constructor(queueService: QueueService,
              nurseService: NurseService,
              userService: UserService,
              patientService: PatientService,
              router: Router,
              activatedRoute: ActivatedRoute) {
    this.queueService = queueService;
    this.nurseService = nurseService;
    this.userService = userService;
    this.patientService = patientService;
    this.router = router;
    this.activatedRoute = activatedRoute;
  }

  public ngOnInit(): void {

    // @ts-ignore
    this.patientsIndexes = Array(this.maxPatientsAtDay).fill().map((x, i) => i);
    if (this.isAdmin()) {
      this.getPreselectedParams();
      this.nurseService.getAllNurses().subscribe((nurses) => {
        this.nurses = nurses;
        this.setInitialQueueView();
      });
    } else {
      this.getNurse()
    }
  }

  public setInitialQueueView(): void {
    this.specialities = this.getUniqueNursesSpecialities();
    if (this.preselectedParams) {
      this.popUpComponent.show("User was successfully registered in queue", true);
      this.selectedSpeciality = this.preselectedParams.specialist;
      this.filterNurses();
      this.selectedNurseId = this.preselectedParams.nurseId;
      this.selectDate(new Date(this.preselectedParams.selectedDateStr));
    } else {
      this.selectedSpeciality = this.specialities[0];
      this.onSpecialityUpdate();
      this.selectDate(new Date());
    }
  }

  public onInputChange(): void {
    this.selectDate(new Date(this.selectedDateStr));
  }


  public navigateToPatientOverview(index: number): void {
    this.router.navigate(["patients", this.patients[index].id]);
  }

  public selectNextDate(): void {
    const splited = this.selectedDateStr.split("-");
    console.log(splited);
    let nextDate = new Date(Date.UTC(Number(splited[0]), Number(splited[1]) - 1, Number(splited[2]) + 1));
    console.log(nextDate);
    this.selectDate(nextDate);
  }

  public selectPrevDate(): void {
    const splited  = this.selectedDateStr.split("-");
    console.log(splited);
    let prevDate = new Date(Date.UTC(Number(splited[0]), Number(splited[1]) - 1, Number(splited[2]) - 1));
    this.selectDate(prevDate);
  }

  public getPatientFullName(patientIndex: number): string {
    return this.patients[patientIndex].fname + " " + this.patients[patientIndex].lname;
  }

  public getNurseFullName(nurse: User): string {
    return nurse.fname + " " + nurse.lname;
  }

  public onSpecialityUpdate(): void {
    this.filterNurses();
    this.selectedNurseId = this.filteredNurses[0].id;
    if (this.selectedNurseId) {
      this.updateQueue();
    }
  }

  private filterNurses(): void {
    this.filteredNurses = this.nurses.filter(nurse => nurse.specialist === this.selectedSpeciality);
  }

  public onNurseUpdate(): void {
    this.updateQueue();
  }

  public isAdmin(): boolean {
    return this.userService.isAdmin();
  }

  public findQueue(nurseId: string): void {

    const hospitalId = this.getHospitalId()



    this.queueService.getQueue(nurseId, hospitalId).subscribe((res) => {
      const dayOfTheWeek = new Date(this.selectedDateStr).getDay();
      this.dateInterval = res[dayOfTheWeek];
      console.log(dayOfTheWeek);
      console.log(this.dateInterval);
      if (dayOfTheWeek < 6 && dayOfTheWeek !== 0) {
        this.getPatients();
      }
    });
  }

  public getHospitalId(): string {
    if (this.isAdmin()) {
      return this.userService.getUserId();
    } else {
      return this.nurse.hospitalId
    }
  }

  public getNurseName(): string {
    return this.nurse.fname + ' ' + this.nurse.lname
  }

  public getPatients(): void {
    this.isLoading = true;
    for (let i = 10, j = 0; i <= 16; i++, j++) {
      if (i !== 13) {
        const patientId = this.dateInterval[i].patientId;
        console.log(patientId);
        if (patientId) {
          this.patientService.getById(patientId).subscribe((patient) => {
            this.patients[j] = patient;
            this.patientsLoadStatuses[j] = true;
          });
        }
      }
      setTimeout(() => {
        this.wasDataFetched = true;
        this.isLoading = false;
      }, 300);
    }
  }

  private selectDate(date: Date): void {
    this.selectedDateStr = date.toISOString().substring(0, 10);
    this.updateQueue();
  }

  public updateQueue(): void {
    this.wasDataFetched = false;
    this.resetData();
    this.findQueue(this.selectedNurseId);
  }

  private getNurse(): void {
    this.nurseLoading = true
    this.userService.getInfoAboutMe().subscribe((nurse) => {
      this.nurse = nurse
      this.nurseLoading = false
      this.selectedNurseId = this.nurse.id
      this.selectDate(new Date())
    })
  }

  private resetData(): void {
    this.wasDataFetched = false;
    this.patients = [];
    this.patientsLoadStatuses = [];
  }

  private getUniqueNursesSpecialities(): Specialist[] {
    if (this.nurses) {
      return this.nurses
        .map((nurse) => nurse.specialist)
        .filter((speciality, index, array) => array.indexOf(speciality) === index);
    }
  }

  private getPreselectedParams(): void {
    this.activatedRoute.params.subscribe(params => {
      const objectString = params["data"];
      if (objectString) {
        this.preselectedParams = JSON.parse(objectString);
      }
    });
  }

}