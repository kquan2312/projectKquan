import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();

    this.logger.log(`[Request] ${method} ${url}`);

    return next.handle().pipe(
      tap({
        next: () => {
          const response = context.switchToHttp().getResponse();
          const { statusCode } = response;
          const delay = Date.now() - now;
          this.logger.log(
            `[Response] ${method} ${url} - ${statusCode} - ${delay}ms`,
          );
        },
        error: (error) => {
          const statusCode = error.getStatus ? error.getStatus() : 500;
          const delay = Date.now() - now;
          this.logger.error(
            `[Response] ${method} ${url} - ${statusCode} - ${delay}ms - Error: ${error.message}`,
            error.stack,
          );
        },
      }),
    );
  }
}
