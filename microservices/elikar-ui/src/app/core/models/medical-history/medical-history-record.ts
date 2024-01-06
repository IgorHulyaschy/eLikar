import { Patient } from "../patient/patient";
import { User } from "../user/user";

export class MedicalHistoryRecord {
  id: string
  patientId: string
  patient: Patient
  nurseId: string
  nurse: User
  diagnosis: string
  nurseNotes?: string
  createdAt: Date
}
