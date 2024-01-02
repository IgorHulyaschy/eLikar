import { Position } from './position'
import { Specialist } from './specialist'
import { Address } from "./address";

export class User {
  id!: string
  email!: string
  hospitalId!: string
  fname!: string
  lname!: string
  phoneNumber!: string
  position!: Position
  specialist!: Specialist
  name!: string
  address!: Address
}
