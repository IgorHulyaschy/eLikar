import { ConnectionOptions } from 'typeorm';
import { Logger } from '@elikar/logger';
export declare class TypeormProvider {
    private readonly options;
    private readonly logger;
    constructor(options: ConnectionOptions, logger: Logger);
    bootstrap(): Promise<void>;
}
//# sourceMappingURL=TypeormProvider.d.ts.map