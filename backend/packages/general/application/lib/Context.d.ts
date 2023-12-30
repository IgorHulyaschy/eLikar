import { Context as KoaContext } from 'koa';
export type Context<Body = unknown> = KoaContext & {
    request: {
        body: Body;
    };
    state: {
        id: string;
    };
};
//# sourceMappingURL=Context.d.ts.map