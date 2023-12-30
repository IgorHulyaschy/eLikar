import { Options } from './interfaces';
export declare class BcryptService {
    private readonly config;
    constructor(config: Options);
    hash(stringToHash: string): Promise<string>;
    compare(stringToCompare: string, hash: string): Promise<boolean>;
}
//# sourceMappingURL=BcryptService.d.ts.map