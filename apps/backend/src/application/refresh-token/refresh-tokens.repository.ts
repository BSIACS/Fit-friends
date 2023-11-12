import { Injectable, NotImplementedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtPayload, verify } from 'jsonwebtoken';
import { UUID } from '../../types/uuid.type';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshTokenRepository {
  constructor(private readonly prisma: PrismaService, private readonly configService: ConfigService) { }

  public async create(email: string, token: string) {
    const payload: JwtPayload | string = verify(token, this.configService.get('jwt.refreshTokenSecret'));

    await this.prisma.refreshToken.create({
      data: {
        createdAt: new Date((payload as JwtPayload).iat * 1000),
        expiresIn: new Date((payload as JwtPayload).exp * 1000),
        refreshToken: token,
        userId: (payload as JwtPayload).userId,
      }
    });
  }

  public async getActiveTokenByUserId(userId: UUID): Promise<string> {
    const activeRefreshToken = (await this.prisma.refreshToken.findFirst({
      where: {
        userId: userId
      }
    })).refreshToken;

    return activeRefreshToken;
  }

  public async removeByUserId(userId: UUID) {
    await this.prisma.refreshToken.deleteMany({
      where: {
        userId: userId
      }
    });
  }

  public async remove(email: string, token: string) {
    throw new NotImplementedException();
  }
}
