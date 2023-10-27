import { Body, Controller, NotImplementedException, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { UserValidationPipe } from '../pipes/user-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { LoginUserDto } from './dto/login-user-dto';
import { UsersService } from './users.service';
import { TokenPayload } from '../../types/token-payload.interface';
import { JwtRefreshGuard } from './guards/jwtRefreshGuard.guard';
import { RequestWithTokenPayload } from '../../types/request-with-token-payload.interface';

@Controller('users')
export class UsersController {

  constructor(private readonly usersService: UsersService){}

  @Post('register')
  @UsePipes(new UserValidationPipe())
  register(@Body()data: CreateUserDto | CreateTrainerDto) {
    const createdUser = this.usersService.createUser(data);

    return createdUser;
  }

  @Post('login')
  public async login(@Body()data: LoginUserDto) {
    const result = await this.usersService.verifyUser({...data});

    let tokensPair;

    if(result){
      tokensPair = await this.usersService.generateTokens(result.id, result.email, result.name, result.role);
    }

    return tokensPair;
  }

  @Post('refresh')
  @UseGuards(JwtRefreshGuard)
  public async refresh(@Req() request: RequestWithTokenPayload){
    const payload: TokenPayload = request.user;
    const tokensPair = await this.usersService.generateTokens(payload.userId, payload.email, payload.name, payload.role);

    return tokensPair;
  }

  @Post('logout')
  public async logout(){
    throw new NotImplementedException();
  }
}
