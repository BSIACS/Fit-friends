import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokenPayload } from '../../../types/token-payload.interface';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'r-secret',
      passReqToCallback: true,
    });
  }

  public async validate(_req: Request, payload: TokenPayload) {


    return payload;
  }
}
