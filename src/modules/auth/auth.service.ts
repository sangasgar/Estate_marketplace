import { BadRequestException, Injectable } from '@nestjs/common';
import { AppError } from 'src/common/constant/error';
import { TokenService } from 'src/modules/token/token.service';
import { CreateUserDTO, UpdateUsername } from 'src/modules/user/dto';
import { UserService } from 'src/modules/user/user.service';
import { LoginDTO } from './dto';
import { AuthResponce, RefreshResponce, UpdateUserResponce } from './responce';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}
  async registerUser(dto: CreateUserDTO): Promise<AuthResponce> {
    try {
      await this.userService.userRegister(dto);
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
  async loginAuth(dto: LoginDTO, user): Promise<AuthResponce> {
    try {
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
