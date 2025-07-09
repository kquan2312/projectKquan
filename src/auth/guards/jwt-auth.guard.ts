import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard này sẽ tự động kích hoạt JwtStrategy để xác thực token.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
