import { Body, Controller, Get, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtGuard } from '../../../guards/jwtGuard.guard';
import { IsUserRoleGuard } from '../../../guards/is-user-role.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { RequestWithTokenPayload } from '../../../types/request-with-token-payload.interface';
import { CreatePersonalTrainingRequestDto } from './dto/create-personal-training-request.dto';
import { TrainingRequestService } from './training-request.service';
import { TokenPayload } from '../../../types/token-payload.interface';
import { ChangePersonalTrainingRequestStatusDto } from './dto/change-personal-training-request-status.dto';
import { PersonalTrainingRequestEntityInterface } from '../../../entities/personal-training-request.entity';
import { GetUnderConsiderationtDto } from './dto/get-under-consideration.dto';
import { GetAllForRequesterDto } from './dto/get-all-for-requester.dto';
import { CooperativeTrainingRequestEntityInterface } from '../../../entities/cooperative-training-request.entity';
import { CreateCooperativeTrainingRequestDto } from './dto/create-cooperative-training-request.dto';


@ApiTags('trainingRequest')
@UseGuards(JwtGuard)
@Controller('trainingRequest')
export class TrainingRequestController {

  constructor(
    private readonly personalTrainingRequestService: TrainingRequestService,
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

  @Post('/getPersonalTrainingsByRequesterId')
  @ApiBody({ type: CreatePersonalTrainingRequestDto })
  @UseGuards(IsUserRoleGuard)
  @UsePipes(ValidationPipe)
  public async getPersonalTrainingsByRequesterId(@Req() request: RequestWithTokenPayload, @Body() dto: GetAllForRequesterDto): Promise<PersonalTrainingRequestEntityInterface[]> {
    const payload: TokenPayload = request.user;

    const createPersonalTrainingRequest = await this.personalTrainingRequestService.getPersonalTrainingsByRequesterId(payload.userId, dto);

    return createPersonalTrainingRequest;
  }

  @Post('/getCooperativeTrainingsByResponserId')
  @ApiBody({ type: CreatePersonalTrainingRequestDto })
  @UseGuards(IsUserRoleGuard)
  @UsePipes(ValidationPipe)
  public async getCooperativeTrainingsByResponserId(@Req() request: RequestWithTokenPayload, @Body() dto: GetAllForRequesterDto): Promise<PersonalTrainingRequestEntityInterface[]> {
    const payload: TokenPayload = request.user;

    const createPersonalTrainingRequest = await this.personalTrainingRequestService.getCooperativeTrainingsByResponserId(payload.userId, dto);

    return createPersonalTrainingRequest;
  }

  @Post('/getCooperativeTrainingsByRequesterId')
  @ApiBody({ type: CreatePersonalTrainingRequestDto })
  @UseGuards(IsUserRoleGuard)
  @UsePipes(ValidationPipe)
  public async getCooperativeTrainingsByRequesterId(@Req() request: RequestWithTokenPayload, @Body() dto: GetAllForRequesterDto): Promise<PersonalTrainingRequestEntityInterface[]> {
    const payload: TokenPayload = request.user;

    const createPersonalTrainingRequest = await this.personalTrainingRequestService.getCooperativeTrainingsByRequesterId(payload.userId, dto);

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

  @Post('/cooperative')
  @ApiBody({ type: CreateCooperativeTrainingRequestDto })
  @UseGuards(IsUserRoleGuard)
  @UsePipes(ValidationPipe)
  public async createCooperativeTrainingRequest(@Req() request: RequestWithTokenPayload, @Body() dto: CreateCooperativeTrainingRequestDto): Promise<CooperativeTrainingRequestEntityInterface> {
    const payload: TokenPayload = request.user;

    const createPersonalTrainingRequest = await this.personalTrainingRequestService.createCooperativeTrainingRequest(payload.userId, dto.responserId);

    return createPersonalTrainingRequest;
  }

  @Patch('/personalTraining')
  @ApiBody({ type: ChangePersonalTrainingRequestStatusDto })
  @UsePipes(ValidationPipe)
  public async changePersonalTrainingRequestStatus(@Req() request: RequestWithTokenPayload, @Body() dto: ChangePersonalTrainingRequestStatusDto): Promise<PersonalTrainingRequestEntityInterface>{
    const payload: TokenPayload = request.user;

    const updatedPersonalTrainingRequest = await this.personalTrainingRequestService.updatePersonalTrainingRequest(dto.id, payload.userId, dto.status);

    return updatedPersonalTrainingRequest;
  }

  @Patch('/cooperativeTraining')
  @ApiBody({ type: ChangePersonalTrainingRequestStatusDto })
  @UsePipes(ValidationPipe)
  public async changeCooperativeTrainingRequestStatus(@Req() request: RequestWithTokenPayload, @Body() dto: ChangePersonalTrainingRequestStatusDto): Promise<CooperativeTrainingRequestEntityInterface>{
    const payload: TokenPayload = request.user;

    const updatedCooperativeTrainingRequest = await this.personalTrainingRequestService.updateCooperativeTrainingRequest(dto.id, payload.userId, dto.status);

    return updatedCooperativeTrainingRequest;
  }
}
