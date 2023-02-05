import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDTO, UpdateUsername } from './dto';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users) private readonly userRepository: typeof Users,
    private readonly configService: ConfigService,
  ) {}
  async hashPassword(password) {
    return bcrypt.hash(password, Number(this.configService.get('saltrounds')));
  }
  async findUser(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
  async userRegister(dto: CreateUserDTO): Promise<CreateUserDTO> {
    dto.password = await this.hashPassword(dto.password);
    this.userRepository.create({
      username: dto.username,
      email: dto.email,
      password: dto.password,
      phone: dto.phone,
    });
    return dto;
  }
  async updateUser(dto: UpdateUsername): Promise<UpdateUsername> {
    if (dto.user.username) {
      this.userRepository.update(
        { username: dto.user.username },
        { where: { email: dto.email } },
      );
    }
    if (dto.user.password) {
      dto.user.password = await this.hashPassword(dto.user.password);
      this.userRepository.update(
        { password: dto.user.password },
        { where: { email: dto.email } },
      );
    }
    if (dto.user.phone) {
      this.userRepository.update(
        { phone: dto.user.phone },
        { where: { email: dto.email } },
      );
    }
    return dto;
  }
}
