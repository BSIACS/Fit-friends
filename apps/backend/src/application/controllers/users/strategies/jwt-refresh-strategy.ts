import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../../../../types/token-payload.interface';
import { UsersService } from '../users.service';
import { RefreshTokenNotValidException } from '../../../../exceptions/refresh-token-not-valid.exception';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('jwt.refreshTokenSecret'),
      passReqToCallback: true,
    });
  }

  public async validate(_req: Request, payload: TokenPayload) {
    const refreshToken = _req.headers['authorization'].split(' ')[1];

    if(! await this.userService.isRefreshTokenValid(payload.userId, refreshToken)){
      throw new RefreshTokenNotValidException();
    }

    return payload;
  }
}
