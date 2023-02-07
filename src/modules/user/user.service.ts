import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDTO, UpdateUsername } from './dto';
import { Watchlist } from '../watchlist/models/watchlist.model';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users) private readonly userRepository: typeof Users,
    private readonly configService: ConfigService,
  ) {}
  async hashPassword(password: string): Promise<string> {
    try {
      return bcrypt.hash(
        password,
        Number(this.configService.get('saltrounds')),
      );
    } catch (error) {
      throw new Error(error);
    }
  }
  async findUser(email: string): Promise<Users> {
    try {
      const user = await this.userRepository.findOne({ where: { email } });
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async userRegister(dto: CreateUserDTO): Promise<CreateUserDTO> {
    try {
      dto.password = await this.hashPassword(dto.password);
      this.userRepository.create({
        username: dto.username,
        email: dto.email,
        password: dto.password,
        phone: dto.phone,
      });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(email, dto: UpdateUsername): Promise<UpdateUsername> {
    try {
      if (dto.user.username) {
        this.userRepository.update(
          { username: dto.user.username },
          { where: { email } },
        );
      }
      if (dto.user.password) {
        dto.user.password = await this.hashPassword(dto.user.password);
        this.userRepository.update(
          { password: dto.user.password },
          { where: { email } },
        );
      }
      if (dto.user.phone) {
        this.userRepository.update(
          { phone: dto.user.phone },
          { where: { email } },
        );
      }
    } catch (error) {
      throw new Error(error);
    }
    return dto;
  }
  async publicUser(email: string): Promise<Users> {
    try {
      return this.userRepository.findOne({
        where: { email },
        attributes: {
          exclude: ['password'],
        },
        include: {
          model: Watchlist,
          required: false,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
