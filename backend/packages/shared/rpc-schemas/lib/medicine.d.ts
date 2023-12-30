import { MedicineDto } from '@elikar/dto';
export declare class MedicineRpcSchema {
    queueName: string;
    getAll: (hospitalId: string) => Promise<MedicineDto.Medicine[]>;
    get: (id: string) => Promise<MedicineDto.Medicine>;
}
//# sourceMappingURL=medicine.d.ts.map