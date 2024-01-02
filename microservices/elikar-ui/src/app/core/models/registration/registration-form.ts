import { Position } from '../user/position'
import { Specialist } from '../user/specialist'

export class RegistrationForm {
  email!: string
  firstName!: string
  lastName!: string
  phone!: string
  password!: string
  position!: Position
  specialist!: Specialist
}
