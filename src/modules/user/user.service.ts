import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDTO, UpdateUsername } from './dto';
import { PersonService } from '../person/person.service';
import { Role } from '../auth/guards/enums/role.enum';
import { RoleModel } from '../role/model/role.model';
import { Company } from '../company/model/company.model';
import { Wishlist } from '../wishlist/model/wishlist.model';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users) private readonly userRepository: typeof Users,
    private readonly configService: ConfigService,
    private readonly personService: PersonService,
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
      dto.email[0].toUpperCase() + dto.email.substring(1).toLowerCase();
      dto.password = await this.hashPassword(dto.password);
      const user = await this.userRepository.create({
        email: dto.email,
        password: dto.password,
        role_id: Role.Authorized,
      });
      await this.personService.createPerson({
        user_id: user.id,
      });
      return dto;
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(email, dto: UpdateUsername): Promise<UpdateUsername> {
    try {
      if (dto.user.password) {
        dto.user.password = await this.hashPassword(dto.user.password);
        this.userRepository.update(
          { password: dto.user.password },
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
        include: [
          {
            model: Wishlist,
            required: false,
          },
          {
            model: Company,
            required: false,
          },
        ],
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
