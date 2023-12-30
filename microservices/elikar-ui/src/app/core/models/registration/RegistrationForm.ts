export enum Position {
  NURSE = 'NURSE',
  DOCTOR = 'DOCTOR',
  ADMIN = 'ADMIN'
}

export enum Specialist {
  SURGEON = 'SURGEON',
  THERAPIST = 'THERAPIST',
  UROLOGIST = 'UROLOGIST',
  GYNECOLOGIST = 'GYNECOLOGIST'
}

export class RegistrationForm {
  email!: string
  firstName!: string
  lastName!: string
  phone!: string
  password!: string
  position!: Position
  specialist!: Specialist
}
