import { Hospital } from './hospital';
import { Nurse } from './nurse';
export interface Bot {
    id: string;
    email: string;
}
export type Account = Hospital & Omit<Nurse, 'hospitalId'>;
//# sourceMappingURL=bot.d.ts.map