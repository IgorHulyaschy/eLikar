export class MedicalHistoryRecord {
  id: string
  patientId: string
  nurseId: string
  diagnosis: string
  nurseNotes?: string
  createdAt: Date
}
