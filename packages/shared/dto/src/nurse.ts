export interface CreateNurse {
  email: string
  fname: string
  lname: string
  password: string
  hospitalId: string
  phoneNumber: string
  position: Position
  specialist: Specialist
}

export interface TelegramConnect {
  email: string
  id: string
}

export interface Nurse {
  id: string
  hospitalId: string
  phoneNumber: string
  email: string
  fname: string
  lname: string
  position: Position
  specialist: Specialist
}

export interface SignIn {
  email: string
  password: string
}

export interface CreateMedicineReport {
  medicineId: string
  patientId: string
  tgId: string
  count: number
}

export enum Position {
  NURSE = 'Nurse',
  DOCTOR = 'Doctor',
  ADMIN = 'Admin'
}

export enum Specialist {
  SURGEON = 'surgeon',
  THERAPIST = 'therapist',
  UROLOGIST = 'urologist',
  GYNECOLOGIST = 'gynecologist'
}
