import { Component, OnInit } from "@angular/core";
import { NurseService } from "../../services/nurse.service";
import { User } from "../../models/user/user";
import { Specialist } from "../../models/user/specialist";
import { QueueService } from "../../services/queue.service";

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

  private nurseService: NurseService
  private queueService: QueueService
  private nurses: User[]

  constructor(nurseService: NurseService,
              queueService: QueueService) {
    this.nurseService = nurseService
    this.queueService = queueService
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
  }

  public getNurseFullName(nurse: User): string {
    return nurse.fname + ' ' + nurse.lname
  }

  public findQueue(nurseId: string): void {
    this.queueService.getQueue(nurseId).subscribe((res) => {
      console.log(res)
    })
  }

  private getUniqueNursesSpecialities(): Specialist[] {
    if (this.nurses) {
      return  this.nurses.map(nurse => nurse.specialist).filter((speciality, index, array) => array.indexOf(speciality) === index)
    }
  }
}