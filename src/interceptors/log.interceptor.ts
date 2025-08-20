import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        const request = context.switchToHttp().getRequest();

        const dt = Date.now();

        return next.handle().pipe(tap(() => {
            console.log(`METHOD: ${request.method} - URL: [${request.url}] | Execução levou: ${Date.now() - dt}ms.`);
        }))
    }
}