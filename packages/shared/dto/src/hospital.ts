export interface HospitalAddress {
  city: string
  region: string
  street: string
  buildingNumber: string
}

export interface CreateHospital {
  name: string
  address: HospitalAddress
  password: string
  email: string
}
