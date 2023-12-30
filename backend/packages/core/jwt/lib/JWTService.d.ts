import jwt, { JwtPayload } from 'jsonwebtoken';
import { Logger } from '@elikar/logger';
import { Options } from './interfaces';
export declare class JWTService {
    private readonly config;
    private readonly logger;
    constructor(config: Options, logger: Logger);
    sign<T extends object>(payload: T, options: jwt.SignOptions): string;
    verify<T extends JwtPayload>(token: string): Promise<T | null>;
}
//# sourceMappingURL=JWTService.d.ts.map