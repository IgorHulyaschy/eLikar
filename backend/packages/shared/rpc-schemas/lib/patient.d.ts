import { PatientDto } from '@elikar/dto';
export declare class PatientRpcSchema {
    queueName: string;
    getListOfPatients: (dto: PatientDto.GetListOfPatients) => Promise<PatientDto.Patient[]>;
    get: (id: string) => Promise<PatientDto.Patient>;
}
//# sourceMappingURL=patient.d.ts.map