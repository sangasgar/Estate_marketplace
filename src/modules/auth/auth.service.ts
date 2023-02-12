import { BadRequestException, Injectable } from '@nestjs/common';
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
      const userExist = await this.userService.findUser(dto.email);
      if (userExist) throw new BadRequestException(AppError.USER_EXIST);
      await this.userService.userRegister(dto);
      const token = await this.tokenService.generateJWT(dto.email);
      const userFind = JSON.parse(
        JSON.stringify(await this.userService.publicUser(dto.email)),
      );
      return { ...userFind, token };
    } catch (error) {
      throw new Error(error);
    }
  }
  async loginAuth(dto: LoginDTO): Promise<AuthResponce> {
    try {
      const user = await this.userService.findUser(dto.email);
      if (!user) throw new BadRequestException(AppError.USER_NOT_FOUND);
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
    const userFind = await this.userService.findUser(user.email);
    if (!userFind) throw new BadRequestException(AppError.USER_NOT_FOUND);
    const token = await this.tokenService.generateJWT(userFind);
    const refresh_token = await this.tokenService.getRefreshToken(userFind);
    return { token, refresh_token };
  }
}
