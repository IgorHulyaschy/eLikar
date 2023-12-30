import { Options } from './interfaces';
export declare class RedisService {
    private readonly redis;
    constructor({ url }: Options);
    set(key: string, value: string | number | object): Promise<string | null>;
    get<T>(key: string): Promise<T | null>;
    delete(key: string): Promise<number>;
}
//# sourceMappingURL=RedisService.d.ts.map