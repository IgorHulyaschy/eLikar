export interface MedicineRegistered {
  name: string
  unitOfMeasurement: string
}

export interface MedicineRegister extends MedicineRegistered {}

export interface Medicine {
  name: string
  unitOfMeasurement: string
  count: number
}
