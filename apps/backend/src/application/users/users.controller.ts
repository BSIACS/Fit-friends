import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { UserValidationPipe } from '../pipes/user-validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateTrainerDto } from './dto/create-trainer.dto';

@Controller('users')
export class UsersController {

  @Post('register')
  @UsePipes(new UserValidationPipe())
  register(@Body()data: CreateUserDto | CreateTrainerDto) {
    return data;
  }
}
