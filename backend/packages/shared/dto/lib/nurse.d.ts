export interface CreateNurse {
    email: string;
    fname: string;
    lname: string;
    password: string;
    hospitalId: string;
    phoneNumber: string;
}
export interface TelegramConnect {
    email: string;
    id: string;
}
export interface Nurse {
    id: string;
    hospitalId: string;
    phoneNumber: string;
    email: string;
    fname: string;
    lname: string;
}
export interface SignIn {
    email: string;
    password: string;
}
export interface CreateMedicineReport {
    medicineId: string;
    patientId: string;
    tgId: string;
    count: number;
}
//# sourceMappingURL=nurse.d.ts.map