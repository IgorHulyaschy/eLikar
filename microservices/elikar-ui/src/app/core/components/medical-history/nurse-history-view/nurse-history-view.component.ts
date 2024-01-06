import { Component, OnInit } from "@angular/core";
import { Patient } from "../../../models/patient/patient";
import { MedicalHistoryRecord } from "../../../models/medical-history/medical-history-record";
import { PatientService } from "../../../services/patient.service";
import { MedicalHistoryService } from "../../../services/medical-history.sevice";
import { ActivatedRoute } from "@angular/router";
import { NurseService } from "../../../services/nurse.service";
import { User } from "../../../models/user/user";
import { Specialist } from "../../../models/user/specialist";

@Component({
  selector: 'app-nurse-history-view',
  templateUrl: './nurse-history-view.component.html',
  styleUrls: ['./nurse-history-view.component.css', "../medical-history-view/medical-history-view.component.css"]
})
export class NurseHistoryViewComponent implements OnInit{
  public nurses: User[]
  public nurse: User
  public filteredNurses: User[]
  public selectedNurseId: string
  public isLoading = false
  public wasSearched = false
  public medicalHistoryRecords: MedicalHistoryRecord[]
  public filteredSpecialities: Specialist[]
  public specialities: Specialist[]
  public selectedSpeciality: Specialist
  public preSelectedParams = false
  public isNurseDataLoading = false

  constructor(private nurseService: NurseService,
              private medicalHistoryService: MedicalHistoryService,
              private activatedRoute: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.isNurseDataLoading = true
    this.nurseService.getAllNurses().subscribe((res) => {
      this.nurses = res
      this.specialities = this.getUniqueNursesSpecialities()
      this.selectedSpeciality = this.specialities[0]
      this.filterNurses()
      this.selectedNurseId = this.filteredNurses[0].id
      this.isNurseDataLoading = false
      this.activatedRoute.params.subscribe((params) => {
        const id = params['id']
        if (id) {
          this.getPreselectedParams(id)
        } else {
          this.getNurseMedicalHistory()
        }
      })
    })
  }

  public onSpecialityUpdate(): void {
    this.filterNurses();
    this.selectedNurseId = this.filteredNurses[0].id;
    if (this.selectedNurseId) {
      this.updateHistory()
    }
  }

  public onNurseUpdate(): void {
    this.updateHistory()
  }

  public getNurseFullName(nurse: User): string {
    return nurse.fname + " " + nurse.lname;
  }

  public getNurseName(): string {
    if (this.nurse) {
      return this.nurse.fname + " " + this.nurse.lname;
    }
}

  public updateHistory(): void {
    this.isLoading = true
    this.getNurseMedicalHistory()
  }

  private filterNurses(): void {
    this.filteredNurses = this.nurses.filter(nurse => nurse.specialist === this.selectedSpeciality);
  }

  private getPreselectedParams(objectString: string): void {
    this.preSelectedParams = true
    console.log(this.preSelectedParams)
    const preselectedUserId = objectString;
    this.isLoading = true;
    const nurse = this.getNurseById(preselectedUserId);
    this.nurse = nurse
    this.selectedSpeciality = nurse.specialist;
    this.selectedNurseId = nurse.id;
    this.getNurseMedicalHistory();
  }
  private getNurseMedicalHistory(): void {
    this.medicalHistoryService.getNurseMedicalHistory(this.selectedNurseId).subscribe((res) => {
      this.medicalHistoryRecords = res.history
      this.nurse = res.nurse
      this.endLoading()
    })
  }

  private getNurseById(id: string): User {
    return this.nurses.filter(nurse => nurse.id === id)[0]
  }
  private endLoading(): void {
    this.isLoading = false
    this.wasSearched = true
  }

  private getUniqueNursesSpecialities(): Specialist[] {
    if (this.nurses) {
      return this.nurses
        .map((nurse) => nurse.specialist)
        .filter((speciality, index, array) => array.indexOf(speciality) === index);
    }
  }
}