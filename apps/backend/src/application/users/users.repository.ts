import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { PrismaService } from '../prisma/prisma.service';
import { setPasswordHash } from '../../utils/password.util';


@Injectable()
export class UsersRepository {

  constructor(private readonly prisma: PrismaService) { }

  public async findTrainerByEmail(email: string) {
    const foundUser = await this.prisma.trainer.findFirst({
      where: {
        email: email,
      }
    });

    return foundUser;
  }

  public async findUserByEmail(email: string) {
    const foundUser = await this.prisma.user.findFirst({
      where: {
        email: email,
      }
    });

    return foundUser;
  }

  public async createTrainer(dto: CreateTrainerDto) {
    console.log(dto);
    const passwordHash = await setPasswordHash(dto.password);

    const createdTrainer = await this.prisma.trainer.create({
      data: {
        name: dto.name,
        email: dto.email,
        avatarSrc: '',
        passwordHash: passwordHash,
        sex: dto.sex,
        birthDate: new Date(dto.birthDate),
        role: dto.role,
        description: dto.description,
        location: dto.location,
        backgroundImageSrc: '',
        createdAt: new Date(),
        trainingLevel: dto.trainingLevel,
        trainingType: dto.trainingType,
        certificateSrc: '',
        merits: dto.merits,
        isReadyForTraining: dto.isReadyForTraining,
      }
    });

    return createdTrainer;
  }

  public async createUser(dto: CreateUserDto) {
    const passwordHash = await setPasswordHash(dto.password);

    await this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        avatarSrc: '',
        passwordHash: passwordHash,
        sex: dto.sex,
        birthDate: new Date(dto.birthDate),
        role: dto.role,
        description: dto.description,
        location: dto.location,
        backgroundImageSrc: '',
        createdAt: new Date(),
        trainingLevel: dto.trainingLevel,
        trainingType: dto.trainingType,
        trainingDuration: dto.trainingDuration,
        calories: dto.calories,
        caloriesPerDay: dto.caloriesPerDay,
        isReadyForTraining: dto.isReadyForTraining
      }
    });
  }
}
