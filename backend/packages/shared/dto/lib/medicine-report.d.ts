export interface CreateMedicineReport {
    medicineId: string;
    nurceId: string;
    count: number;
    patientId: string;
}
export interface GetMedicineReports {
    nurseId: string;
    date: number;
}
export interface MedicineReport {
    medicineId: string;
    nurceId: string;
    count: number;
    patientId: string;
    createdAt: number;
}
//# sourceMappingURL=medicine-report.d.ts.map