import { Controller, Get, HttpStatus } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('index')
  index() {
    return HttpStatus.NOT_IMPLEMENTED;
  }
}
