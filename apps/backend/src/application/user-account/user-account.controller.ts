import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserAccountService } from './user-account.service';
import { JwtGuard } from '../guards/jwtGuard.guard';
import { IsUserRoleGuard } from '../guards/is-user-role.guard';
import { AddFriendDto } from './dto/add-friend.dto';
import { RemoveFrindDto } from './dto/remove-friend.dto';
import { AddToBalanceDto } from './dto/add-to-balance.dto';
import { SubscribeNewTrainingNotificationDto } from './dto/subscribe-new-training-notification.dto';
import { UsersService } from '../users/users.service';
import { UnsubscribeNewTrainingNotificationDto } from './dto/unsubscribe-new-training-notification.dto';
import { ApiTags } from '@nestjs/swagger';

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
  public async getFriendList(@Param() { id } ) {
    const foundFriends = await this.userAccountService.getFriendList(id);

    return foundFriends;
  }

  @Post('friends')
  public async addFriend(@Body() dto: AddFriendDto): Promise<void> {
    await this.userAccountService.addToFriendsList(dto.userId, dto.newFriendId);
  }

  @Delete('friends')
  public async removeFromFriends(@Body() dto: RemoveFrindDto): Promise<void> {
    await this.userAccountService.removeFromFriendsList(dto.userId, dto.friendId);
  }

  @Get('balance/:id')
  public async getBalance(@Param() { id }) {
    const foundBalance = await this.userAccountService.getUserBalance(id);

    return foundBalance;
  }

  @Post('balance')
  public async addToBalance(@Body() dto: AddToBalanceDto) {
    await this.userAccountService.addToBalance(dto.userId, dto.trainingId, dto.quantity);
  }

  @Delete('balance')
  public async removeFromBalance() {
    throw new BadRequestException();
  }

  @Post('subscribe')
  public async subscribeNewTrainingNotification(@Body() dto: SubscribeNewTrainingNotificationDto) {
    await this.usersService.addToSubscribers(dto.trainerId, dto.newSubscriberId);
  }

  @Delete('unsubscribe')
  public async unsubscribeNewTrainingNotification(@Body() dto: UnsubscribeNewTrainingNotificationDto) {
    await this.usersService.removeFromSubscribers(dto.trainerId, dto.subscriberId);
  }
}
