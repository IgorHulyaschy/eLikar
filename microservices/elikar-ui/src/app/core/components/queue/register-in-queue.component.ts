import { Component, OnInit, ViewChild } from "@angular/core";
import { NurseService } from '../../services/nurse.service'
import { User } from '../../models/user/user'
import { Specialist } from '../../models/user/specialist'
import { QueueService } from '../../services/queue.service'
import { UserService } from '../../services/user.service'
import { DateInterval } from '../../models/queue/date-interval'
import { QueueEntryStatus } from '../../models/queue/queue-entry-status'
import { Patient } from '../../models/patient/patient'
import { PatientService } from '../../services/patient.service'
import { BookQueue } from "../../models/queue/book-queue";
import { PopUpComponent } from "../../../shared/components/pop-up.component";
import { PreselectedQueueState } from "../../models/queue/preselected-queue-state";
import { Router } from "@angular/router";

@Component({
  selector: 'app-register-in-queue',
  templateUrl: './register-in-queue.component.html',
  styleUrls: ['./register-in-queue.component.css']
})
export class RegisterInQueueComponent implements OnInit {
  public specialities: Specialist[]
  public filteredNurses: User[]
  public selectedSpeciality: Specialist
  public selectedNurseId: string
  public selectedTimeInterval: number
  public dateInterval: DateInterval
  public selectedDate: Date
  public phoneToSearch: string
  public patient: Patient
  public textToShowInPatientInfoError: string
  public shouldShowPatientFinderAndRegisterSection = false

  @ViewChild(PopUpComponent, { static: false })
  private popUpComponent!: PopUpComponent

  private nurseService: NurseService
  private queueService: QueueService
  private userService: UserService
  private patientService: PatientService
  private nurses: User[]
  private router: Router

  constructor(
    nurseService: NurseService,
    queueService: QueueService,
    userService: UserService,
    patientService: PatientService,
    router: Router
  ) {
    this.nurseService = nurseService
    this.queueService = queueService
    this.userService = userService
    this.patientService = patientService
    this.router = router
  }

  public ngOnInit(): void {
    this.nurseService.getAllNurses().subscribe((nurses) => {
      this.nurses = nurses
      this.specialities = this.getUniqueNursesSpecialities()
      this.selectedSpeciality = this.specialities[0]
      this.filterNursesBySelectedSpeciality()
      this.selectedNurseId = this.filteredNurses[0].id
    })
  }

  public shouldSearchButtonBeDisabled(): boolean {
    if (this.phoneToSearch) {
      return this.phoneToSearch.length < 6
    }
    return true
  }

  public goBack(): void {
    this.shouldShowPatientFinderAndRegisterSection = false
  }

  public filterNursesBySelectedSpeciality(): void {
    this.filteredNurses = this.nurses.filter(nurse => nurse.specialist === this.selectedSpeciality)
    this.selectedNurseId = this.filteredNurses[0].id
  }

  public getNurseFullName(nurse: User): string {
    return nurse.fname + ' ' + nurse.lname
  }

  public findQueue(nurseId: string): void {
    const hospitalId = this.userService.getUserId()
    this.queueService.getQueue(nurseId, hospitalId).subscribe((res) => {
      const dayOfTheWeek = new Date(this.selectedDate).getDay()
      this.dateInterval = res[dayOfTheWeek]
    })
  }

  public shouldSelectTimeIntervalBeDisabled(): boolean {
    return !this.selectedTimeInterval
  }

  public selectTimeInterval(interval: number): void {
    if (!this.isTimeIntervalBooked(interval)) {
      this.selectedTimeInterval = interval
    }
  }

  public goToFindUserAndRegisterButtonSection(): void {
    this.shouldShowPatientFinderAndRegisterSection = true
  }

  public isTimeIntervalBooked(interval: number): boolean {
    if (this.dateInterval) {
      const queryEntry = this.dateInterval[interval.toString()]
      if (queryEntry && queryEntry.status) {
        return queryEntry.status === QueueEntryStatus.BOOKED
      }
      return false
    }
  }

  public searchByPhone(): void {
    this.patientService.getByPhone(this.phoneToSearch).subscribe(
      (res) => {
        this.patient = res.patient
        console.log(this.patient)
        if (!this.patient) {
          this.textToShowInPatientInfoError = 'Patient not found'
        }
      },
      () => {
        this.textToShowInPatientInfoError = 'Error occurred. Try again'
      }
    )
  }

  public getSelectedNurseName(): string {
    const nurse = this.nurses.filter((nurse) => nurse.id === this.selectedNurseId)[0]
    return nurse.fname + ' ' + nurse.lname
  }

  public registerInQueue(): void {
    if (this.patient) {
      this.queueService.registerInQueue(this.getBookQueue()).subscribe((res) => {
          const preselectedQueueState = new PreselectedQueueState()
          preselectedQueueState.nurseId = this.selectedNurseId
          preselectedQueueState.specialist = this.selectedSpeciality
          preselectedQueueState.selectedDateStr = new Date(this.selectedDate).toISOString().substring(0, 10)
          this.router.navigate(['queue-view/', JSON.stringify(preselectedQueueState)])
        },
        () => {
          this.popUpComponent.show('Error occurred. Try again', false)
        }
      )
    }
  }

  private getBookQueue(): BookQueue {
    const bookQueue = new BookQueue()
    bookQueue.nurseId = this.selectedNurseId
    bookQueue.bookedTime = this.selectedTimeInterval
    bookQueue.patientId = this.patient.id
    bookQueue.dayOfMonth = new Date(this.selectedDate).toISOString().substring(0, 10)
    return bookQueue
  }
  private getUniqueNursesSpecialities(): Specialist[] {
    if (this.nurses) {
      return this.nurses
        .map((nurse) => nurse.specialist)
        .filter((speciality, index, array) => array.indexOf(speciality) === index)
    }
  }
}
