import { Body, Controller, Get, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from '../../../guards/jwtGuard.guard';
import { IsUserRoleGuard } from '../../../guards/is-user-role.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RequestWithTokenPayload } from '../../../types/request-with-token-payload.interface';
import { CreatePersonalTrainingRequestDto } from './dto/create-personal-training-request.dto';
import { PersonalTrainingRequestService } from './personal-training-request.service';
import { TokenPayload } from '../../../types/token-payload.interface';
import { ChangePersonalTrainingRequestStatusDto } from './dto/change-personal-training-request-status.dto';
import { PersonalTrainingRequestEntityInterface } from '../../../entities/personal-training-request.entity';
import { GetUnderConsiderationtDto } from './dto/get-under-consideration.dto';


@ApiTags('personalTrainingRequest')
@UseGuards(JwtGuard)
@Controller('personalTrainingRequest')
export class PersonalTrainingRequestController {

  constructor(
    private readonly personalTrainingRequestService: PersonalTrainingRequestService,
  ) { }

  @Post('/getUnderConsideration')
  @ApiBody({ type: CreatePersonalTrainingRequestDto })
  @UseGuards(IsUserRoleGuard)
  @UsePipes(ValidationPipe)
  public async getUnderConsideration(@Req() request: RequestWithTokenPayload, @Body() dto: GetUnderConsiderationtDto): Promise<PersonalTrainingRequestEntityInterface> {
    const payload: TokenPayload = request.user;

    const createPersonalTrainingRequest = await this.personalTrainingRequestService.getUnderConsideration(payload.userId, dto.responserId);

    return createPersonalTrainingRequest;
  }

  @Post('/')
  @ApiBody({ type: CreatePersonalTrainingRequestDto })
  @UseGuards(IsUserRoleGuard)
  @UsePipes(ValidationPipe)
  public async createPersonalTrainingRequest(@Req() request: RequestWithTokenPayload, @Body() dto: CreatePersonalTrainingRequestDto): Promise<PersonalTrainingRequestEntityInterface> {
    const payload: TokenPayload = request.user;

    const createPersonalTrainingRequest = await this.personalTrainingRequestService.createPersonalTrainingRequest(payload.userId, dto.responserId);

    return createPersonalTrainingRequest;
  }

  @Patch('/')
  @ApiBody({ type: ChangePersonalTrainingRequestStatusDto })
  @UsePipes(ValidationPipe)
  public async changePersonalTrainingRequestStatus(@Req() request: RequestWithTokenPayload, @Body() dto: ChangePersonalTrainingRequestStatusDto): Promise<PersonalTrainingRequestEntityInterface>{
    const payload: TokenPayload = request.user;

    const updatedPersonalTrainingRequest = await this.personalTrainingRequestService.changeStatus(dto.id, payload.userId, dto.status);

    return updatedPersonalTrainingRequest;
  }
}
