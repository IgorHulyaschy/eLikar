export interface MedicineRegistered {
    hospitalId: string;
    name: string;
    unitOfMeasurement: string;
}
export interface MedicineRegister extends MedicineRegistered {
}
export interface MedicineUpdatedCount {
    count: number;
}
export interface MedicineUpdateCount extends MedicineUpdatedCount {
    id: string;
}
export interface Medicine {
    id: string;
    name: string;
    unitOfMeasurement: string;
    count: number;
}
//# sourceMappingURL=medicine.d.ts.map