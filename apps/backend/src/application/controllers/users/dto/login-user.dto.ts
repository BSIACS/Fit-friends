import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginUserDto{
  @ApiProperty({
    description: 'User unique address',
    example: 'yaroslavthetrainer@somemail.com',
  })
  @IsEmail({}, {message: '[email] Некорректный email'})
  public email: string;

  @ApiProperty({
    description: 'User password',
    example: 'testpass'
  })
  @IsString()
  public password: string;
}
