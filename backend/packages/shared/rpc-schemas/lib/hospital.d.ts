import { HospitalDto } from '@elikar/dto';
export declare class HospitalRpcSchema {
    queueName: string;
    validateCreation: (data: HospitalDto.CreateHospital) => Promise<void>;
    signIn: (data: HospitalDto.SignIn) => Promise<{
        token: string;
    }>;
    validateToken: (token: string) => Promise<HospitalDto.Hospital | null>;
    get: (id: string) => Promise<HospitalDto.Hospital>;
}
//# sourceMappingURL=hospital.d.ts.map