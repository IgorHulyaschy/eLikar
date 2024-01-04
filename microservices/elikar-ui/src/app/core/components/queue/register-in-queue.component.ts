import { Component, OnInit } from "@angular/core";
import { NurseService } from "../../services/nurse.service";
import { User } from "../../models/user/user";
import { Specialist } from "../../models/user/specialist";
import { QueueService } from "../../services/queue.service";
import { UserService } from '../../services/user.service'
import { DateInterval } from '../../models/queue/date-interval'
import { QueueEntryStatus } from "../../models/queue/queue-entry-status";

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

  private nurseService: NurseService
  private queueService: QueueService
  private userService: UserService
  private nurses: User[]

  constructor(nurseService: NurseService,
              queueService: QueueService,
              userService: UserService) {
    this.nurseService = nurseService
    this.queueService = queueService
    this.userService = userService
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

  public selectTimeInterval(interval: number): void {
    this.selectedTimeInterval = interval
  }

  public isTimeIntervalBooked(interval: number): boolean {
    if (this.dateInterval) {
      const queryEntry = this.dateInterval[interval.toString()]
      if (queryEntry && queryEntry.status) {
        return queryEntry === QueueEntryStatus.BOOKED
      }
      return false
    }
  }

  private getUniqueNursesSpecialities(): Specialist[] {
    if (this.nurses) {
      return  this.nurses.map(nurse => nurse.specialist).filter((speciality, index, array) => array.indexOf(speciality) === index)
    }
  }
}
