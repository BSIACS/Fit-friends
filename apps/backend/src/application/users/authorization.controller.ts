import { Controller, Get, NotImplementedException } from '@nestjs/common';

@Controller('authorization')
export class AuthorizationController {

  @Get('index')
  index() {
    throw new NotImplementedException();
  }
}
