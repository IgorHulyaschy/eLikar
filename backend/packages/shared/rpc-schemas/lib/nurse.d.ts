import { NurseDto } from '@elikar/dto';
export declare class NurseRpcSchema {
    queueName: string;
    validateCreation: (dto: NurseDto.CreateNurse) => Promise<void>;
    getByTgId: (id: string) => Promise<NurseDto.Nurse>;
    signIn: (dto: NurseDto.SignIn) => Promise<{
        token: string;
    }>;
    validateToken: (token: string) => Promise<NurseDto.Nurse | null>;
    get: (id: string) => Promise<NurseDto.Nurse>;
}
//# sourceMappingURL=nurse.d.ts.map