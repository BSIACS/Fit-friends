import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { JwtGuard } from '../../../guards/jwtGuard.guard';
import { IsUserRoleGuard } from '../../../guards/is-user-role.guard';
import { AddFriendDto } from './dto/add-friend.dto';
import { RemoveFrindDto } from './dto/remove-friend.dto';
import { AddToBalanceDto } from './dto/add-to-balance.dto';
import { UsersService } from '../users/users.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { fromEntitiesToUsersAndTrainersRdos, fromEntitiesToUsersRdos } from '../users/mappers/users.mappers';
import { UserRdo } from '../users/rdo/user.rdo';
import { RequestWithTokenPayload } from '../../../types/request-with-token-payload.interface';
import { TokenPayload } from '../../../types/token-payload.interface';
import { RemoveFromBalanceDto } from './dto/remove-from-balance.dto';
import { SubscribeForNewTrainingsNotificationsDto } from './dto/subscribe-for-new-trainings-notifications.dto';
import { UnsubscribeFromTrainingsNotificationsDto } from './dto/unsubscribe-from-trainings-notifications.dto';
import { UserEntityInterface } from '../../../entities/user-entity.interface';
import { TrainerEntityInterface } from '../../../entities/trainer-entity.interface';

@ApiTags('userAccount')
@UseGuards(JwtGuard)
@UseGuards(IsUserRoleGuard)
@Controller('userAccount')
export class UserAccountController {

  constructor(
    private readonly userAccountService: UserAccountService,
    private readonly usersService: UsersService,
    ) { }

  @Get('friends/:id')
  public async getFriendList(@Req() request: RequestWithTokenPayload): Promise<(UserEntityInterface | TrainerEntityInterface)[]> {
    const payload: TokenPayload = request.user;
    const foundFriends = await this.userAccountService.getFriendList(payload.userId);

    return fromEntitiesToUsersAndTrainersRdos(foundFriends);
  }

  @ApiBody({ type: AddFriendDto })
  @Post('friends')
  public async addFriend(@Req() request: RequestWithTokenPayload, @Body() dto: AddFriendDto): Promise<void> {
    const payload: TokenPayload = request.user;

    await this.userAccountService.addToFriendsList(payload.userId, dto.newFriendId);
  }

  @ApiBody({ type: RemoveFrindDto })
  @Post('friends/remove')
  public async removeFromFriends(@Req() request: RequestWithTokenPayload, @Body() dto: RemoveFrindDto): Promise<void> {
    const payload: TokenPayload = request.user;
    await this.userAccountService.removeFromFriendsList(payload.userId, dto.friendId);
  }

  @Get('balance')
  public async getBalance(@Req() request: RequestWithTokenPayload) {
    const payload: TokenPayload = request.user;
    const foundBalance = await this.userAccountService.getUserBalance(payload.userId);

    return foundBalance;
  }

  @ApiBody({ type: AddToBalanceDto })
  @Post('balance/add')
  public async addToBalance(@Req() request: RequestWithTokenPayload, @Body() dto: AddToBalanceDto) {
    const payload: TokenPayload = request.user;

    await this.userAccountService.addToBalance(payload.userId, dto.trainingId, dto.quantity);
  }

  @ApiBody({ type: RemoveFromBalanceDto })
  @Post('balance/remove')
  public async removeFromBalance(@Req() request: RequestWithTokenPayload, @Body() dto: RemoveFromBalanceDto) {
    const payload: TokenPayload = request.user;

    await this.userAccountService.removeFromBalance(payload.userId, dto.trainingId, dto.quantity);
  }

  @ApiBody({ type: SubscribeForNewTrainingsNotificationsDto })
  @Post('subscribe')
  public async subscribeNewTrainingNotification(@Req() request: RequestWithTokenPayload, @Body() dto: SubscribeForNewTrainingsNotificationsDto) {
    const payload: TokenPayload = request.user;

    await this.usersService.addToSubscribers(dto.trainerId, payload.userId);
  }

  @ApiBody({ type: UnsubscribeFromTrainingsNotificationsDto })
  @Post('unsubscribe')
  public async unsubscribeNewTrainingNotification(@Req() request: RequestWithTokenPayload, @Body() dto: UnsubscribeFromTrainingsNotificationsDto) {
    const payload: TokenPayload = request.user;

    await this.usersService.removeFromSubscribers(dto.trainerId, payload.userId);
  }
}
