"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalCatcher = void 0;
const HTTPError_1 = require("./HTTPError");
class GlobalCatcher {
    static async use(ctx, next) {
        try {
            await next();
        }
        catch (err) {
            if (err.UNAUTHORIZED) {
                ctx.body = { error: err.message };
                ctx.status = 401;
                return;
            }
            if (err.TOKEN_EXPIRED) {
                ctx.body = { error: err.message };
                ctx.status = 400;
            }
            if (err instanceof HTTPError_1.HTTPError) {
                ctx.body = {
                    error: err.message
                };
                ctx.status = err.status;
                return;
            }
            ctx.body = { error: err.message };
            ctx.status = 500;
        }
    }
}
exports.GlobalCatcher = GlobalCatcher;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2xvYmFsQ2F0Y2hlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9HbG9iYWxDYXRjaGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLDJDQUF1QztBQUV2QyxNQUFhLGFBQWE7SUFDeEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBWSxFQUFFLElBQVU7UUFDdkMsSUFBSTtZQUNGLE1BQU0sSUFBSSxFQUFFLENBQUE7U0FDYjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osSUFBSSxHQUFHLENBQUMsWUFBWSxFQUFFO2dCQUNwQixHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtnQkFDakMsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUE7Z0JBQ2hCLE9BQU07YUFDUDtZQUNELElBQUksR0FBRyxDQUFDLGFBQWEsRUFBRTtnQkFDckIsR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUE7Z0JBQ2pDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFBO2FBQ2pCO1lBQ0QsSUFBSSxHQUFHLFlBQVkscUJBQVMsRUFBRTtnQkFDNUIsR0FBRyxDQUFDLElBQUksR0FBRztvQkFDVCxLQUFLLEVBQUUsR0FBRyxDQUFDLE9BQU87aUJBQ25CLENBQUE7Z0JBQ0QsR0FBRyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFBO2dCQUN2QixPQUFNO2FBQ1A7WUFDRCxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsS0FBSyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtZQUNqQyxHQUFHLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQTtTQUNqQjtJQUNILENBQUM7Q0FDRjtBQXpCRCxzQ0F5QkMifQ==