export enum Status {
  BOOKED = 'BOOKED',
  DONE = 'DONE'
}

export enum Week {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7
}

export interface ElectronicQueue {
  id: string
  hospitalId: string
  nurseId: string
  patientId: string
  status: Status
  dayOfMonth: Date
  bookedTime: number
}

export interface CreateElectronicQueue {
  hospitalId: string
  nurseId: string
  patientId: string
  dayOfMonth: number
  bookedTime: number
}

export interface GetElectronicQueue {
  nurseId: string
  hospitalId: string
}

export interface SetDone {
  queueId: string
  diagnosis: string
  nurseNotes?: string
}
