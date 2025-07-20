import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * Phương thức này được gọi sau khi token được xác thực.
   * Payload đã được giải mã sẽ được truyền vào đây.
   * Bất cứ thứ gì được trả về từ đây sẽ được gắn vào đối tượng req.user.
   */
  async validate(payload: { sub: string; username: string }) {
    return { sub: payload.sub, username: payload.username };
  }
}
