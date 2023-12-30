import { Context, Next } from 'koa';
export interface Middleware {
    use: (ctx: Context, next: Next) => Promise<any>;
}
//# sourceMappingURL=Middleware.d.ts.map