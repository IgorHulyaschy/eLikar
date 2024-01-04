export interface MedicalHistory {
  id: string
  patientId: string
  nurseId: string
  diagnosis: string
  nurseNotes?: string
  createdAt: Date
}

export interface CreateMedicalHistory {
  patientId: string
  nurseId: string
  diagnosis: string
  nurseNotes?: string
}
