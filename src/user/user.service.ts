import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDTO } from './dto';
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
}
