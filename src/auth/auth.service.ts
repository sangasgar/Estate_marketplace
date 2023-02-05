import { BadRequestException, Injectable } from '@nestjs/common';
import { AppError } from 'src/common/constant/error';
import { TokenService } from 'src/token/token.service';
import { CreateUserDTO, UpdateUsername } from 'src/user/dto';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto';
import { AuthResponce } from './responce';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
  async registerUser(dto: CreateUserDTO): Promise<AuthResponce> {
    const userExist = await this.userService.findUser(dto.email);
    if (userExist) throw new BadRequestException(AppError.USER_EXIST);
    const user = await this.userService.userRegister(dto);
    const token = await this.tokenService.generateJWT(dto.email);
    return {
      username: user.username,
      email: user.email,
      phone: user.phone,
      token,
    };
  }
  async loginAuth(dto: LoginDTO): Promise<AuthResponce> {
    const user = await this.userService.findUser(dto.email);
    if (!user) throw new BadRequestException(AppError.USER_NOT_FOUND);
    const validateUser = await bcrypt.compare(dto.password, user.password);
    if (!validateUser)
      throw new BadRequestException(AppError.USER_WRONG_PASSWORD);
    const userData = {
      username: user.username,
      email: user.email,
    };
    const token = await this.tokenService.generateJWT(userData);
    return {
      username: user.username,
      email: user.email,
      phone: user.phone,
      token,
    };
  }
  async updateUser(dto: UpdateUsername): Promise<AuthResponce> {
    const userUpdate = await this.userService.updateUser(dto);
    const userData = {
      username: userUpdate.user.username,
      email: userUpdate.email,
    };
    const token = await this.tokenService.generateJWT(userData);
    return {
      username: userUpdate.user.username,
      email: userUpdate.email,
      phone: userUpdate.user.phone,
      token,
    };
  }
}
