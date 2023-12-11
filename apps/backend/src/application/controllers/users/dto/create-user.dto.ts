import { IsEmail, IsEnum, IsOptional, Matches, MaxLength, MinLength } from 'class-validator';
import { LocationEnum } from '../../../../types/location.enum';
import { SexEnum } from '../../../../types/sex.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'User name',
    example: 'Михаил',
  })
  @Matches(/^[a-zа-яА-Я]+$/i)
  @MinLength(1)
  @MaxLength(15)
  name: string;

  @ApiProperty({
    description: 'User unique address',
    example: 'michael@somemail.ru',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    example: 'testpass'
  })
  @MinLength(6)
  @MaxLength(12)
  password: string;

  @ApiProperty({
    description: 'User sex',
    example: 'male'
  })
  @IsEnum(SexEnum)
  sex: SexEnum;

  @ApiProperty({
    description: 'User birth date',
    example: '1990-03-12',
  })
  @IsOptional()
  birthDate: Date;

  @ApiProperty({
    description: 'Metro station (Pionerskaya, Petrogradskaya, Udelnaya, Zvyozdnaya, Sportivnaya)',
    example: 'Petrogradskaya',
  })
  @IsEnum(LocationEnum)
  location: LocationEnum;
}
