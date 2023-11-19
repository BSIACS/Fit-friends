import { Body, Controller, Delete, Get, Param, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UUID } from '../../../types/uuid.type';
import { RequestWithTokenPayload } from '../../../types/request-with-token-payload.interface';
import { TokenPayload } from '../../../types/token-payload.interface';
import { JwtGuard } from '../../../guards/jwtGuard.guard';
import { NotificationsService } from './notifications.service';
import { DeleteNotificationDto } from './dto/delete-notification.dto';
import { fromEntitiesToGetNotificationsRdos } from './mappers/notifications.mappers';
import { GetNotificationsRdo } from './rdo/get-notifications.rdo';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {

  constructor(
    private readonly notitficationsService: NotificationsService
  ) { }

  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    example: 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmQwZWE1Zi03ZTVlLTQ1MmYtOGM3YS1kODNjMDBjYTU0NTEiLCJlbWFpbCI6Im9sZ2FAc29tZW1haWwuY29tIiwibmFtZSI6ItCe0LvRjNCz0LAiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5OTYxOTQ4NSwiZXhwIjoxNjk5NjU1NDg1fQ.MCM1XxOAQ7L1qdqcQK5QDnno_XXHHyAb3C3pI_WtjDI'
  })
  @Get('/')
  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async getNotifications(@Req() request: RequestWithTokenPayload): Promise<GetNotificationsRdo[]> {
    const payload: TokenPayload = request.user;

    const foundNotifications = await this.notitficationsService.getNotifications(payload.userId);

    return fromEntitiesToGetNotificationsRdos(foundNotifications);
  }

  @ApiHeader({
    name: 'Authorization',
    description: 'Access token',
    example: 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIyYmQwZWE1Zi03ZTVlLTQ1MmYtOGM3YS1kODNjMDBjYTU0NTEiLCJlbWFpbCI6Im9sZ2FAc29tZW1haWwuY29tIiwibmFtZSI6ItCe0LvRjNCz0LAiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5OTYxOTQ4NSwiZXhwIjoxNjk5NjU1NDg1fQ.MCM1XxOAQ7L1qdqcQK5QDnno_XXHHyAb3C3pI_WtjDI'
  })
  @Delete('/')
  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async deleteNotification(@Body() dto: DeleteNotificationDto, @Req() request: RequestWithTokenPayload): Promise<void> {
    const payload: TokenPayload = request.user;

    await this.notitficationsService.deleteNotification(payload.userId, dto.id);
  }

}
