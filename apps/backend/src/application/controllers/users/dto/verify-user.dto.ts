import { IsEmail, IsString } from 'class-validator';

export class VerifyUserDto{
  @IsEmail({})
  public email: string;

  @IsString()
  public password: string;
}
