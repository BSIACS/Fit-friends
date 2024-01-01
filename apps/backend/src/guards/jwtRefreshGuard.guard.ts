import { AuthGuard } from '@nestjs/passport';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof JsonWebTokenError) {
      throw new BadRequestException();
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
