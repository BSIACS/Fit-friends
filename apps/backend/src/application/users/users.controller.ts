import { Body, Controller, Get, NotImplementedException, Param, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { UserValidationPipe } from '../pipes/user-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { UsersService } from './users.service';
import { TokenPayload } from '../../types/token-payload.interface';
import { JwtRefreshGuard } from './guards/jwtRefreshGuard.guard';
import { RequestWithTokenPayload } from '../../types/request-with-token-payload.interface';
import { TokensPairRdo } from './rdo/tokens-pair.rdo';
import { ParseFormDataJsonPipe } from '../pipes/parse-form-data-json.pipe';
import { UUID } from '../../types/uuid.type';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

interface UserDetailParamsInterface {
  id: UUID
}

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService){}

  @Post('register')
  @UsePipes(new UserValidationPipe())
  public async register(@Body()data: CreateUserDto | CreateTrainerDto) {
    const createdUser = this.usersService.createUser(data);

    return createdUser;
  }

  @Post('update')
  public async updateUser(@Body()data: UpdateUserDto | UpdateTrainerDto) {
    const updatedUser = this.usersService.updateUser(data);

    return updatedUser;
  }

  @Post('test')
  @UsePipes(new ParseFormDataJsonPipe())
  public async test(@Body()data: CreateUserDto | CreateTrainerDto) {
    console.log(data);

    console.log(data);

    return data;
  }

  @Post('login')
  public async login(@Body()data: LoginUserDto): Promise<TokensPairRdo> {
    const verifiedUser = await this.usersService.verifyUser({...data});

    let tokensPair;

    if(verifiedUser){
      tokensPair = await this.usersService.generateTokens(verifiedUser.id, verifiedUser.email, verifiedUser.name, verifiedUser.role);
    }

    return tokensPair;
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  public async refresh(@Req() request: RequestWithTokenPayload): Promise<TokensPairRdo>{
    const payload: TokenPayload = request.user;
    const tokensPair = await this.usersService.generateTokens(payload.userId, payload.email, payload.name, payload.role);

    return tokensPair;
  }

  @Post('logout')
  public async logout(): Promise<void>{
    throw new NotImplementedException();
  }

  @Get('detail/:id')
  public async userDetail(@Param() {id}: UserDetailParamsInterface){
    const foundUser = await this.usersService.getUserDetail(id);

    return foundUser;
  }
}
