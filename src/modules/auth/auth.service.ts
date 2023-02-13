import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AppError } from 'src/common/constant/error';
import { TokenService } from 'src/modules/token/token.service';
import { CreateUserDTO, UpdateUsername } from 'src/modules/user/dto';
import { UserService } from 'src/modules/user/user.service';
import { LoginDTO } from './dto';
import { AuthResponce, RefreshResponce, UpdateUserResponce } from './responce';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
  async registerUser(dto: CreateUserDTO): Promise<AuthResponce> {
    try {
      await this.userService.userRegister(dto);
      const token = await this.tokenService.generateJWT(dto.email);
      const userFind = JSON.parse(
        JSON.stringify(await this.userService.publicUser(dto.email)),
      );
      const refresh_token = await this.tokenService.getRefreshToken(userFind);
      return { ...userFind, token, refresh_token };
    } catch (error) {
      throw new Error(error);
    }
  }
  async loginAuth(dto: LoginDTO, user): Promise<AuthResponce> {
    try {
      const validateUser = await bcrypt.compare(dto.password, user.password);
      if (!validateUser)
        throw new BadRequestException(AppError.USER_WRONG_PASSWORD);
      const userFind = JSON.parse(
        JSON.stringify(await this.userService.publicUser(dto.email)),
      );
      const token = await this.tokenService.generateJWT(userFind);
      const refresh_token = await this.tokenService.getRefreshToken(userFind);
      return { ...userFind, token, refresh_token };
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateUser(email, dto: UpdateUsername): Promise<UpdateUserResponce> {
    const userUpdate = await this.userService.updateUser(email, dto);
    return {
      username: userUpdate.user.username,
      email,
      phone: userUpdate.user.phone,
    };
  }
  async refreshToken(user): Promise<RefreshResponce> {
    const token = await this.tokenService.generateJWT(user);
    const refresh_token = await this.tokenService.getRefreshToken(user);
    return { token, refresh_token };
  }
}
