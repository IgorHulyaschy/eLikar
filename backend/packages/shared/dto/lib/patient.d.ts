export interface CreatePatient {
    fname: string;
    lname: string;
    hospitalId: string;
    phoneNumber: string;
    diagnosis: string;
}
export interface GetListOfPatients {
    hospitalId: string;
    limit: number;
    offset: number;
}
export interface Patient {
    id: string;
    fname: string;
    lname: string;
    hospitalId: string;
    phoneNumber: string;
    diagnosis: string;
    isHealthy: boolean;
}
//# sourceMappingURL=patient.d.ts.map