import { BadRequestException, Injectable } from '@nestjs/common';
import { AppError } from 'src/common/constant/error';
import { TokenService } from 'src/modules/token/token.service';
import { CreateUserDTO, UpdateUsername } from 'src/modules/user/dto';
import { UserService } from 'src/modules/user/user.service';
import { LoginDTO } from './dto';
import { AuthResponce, UpdateUserResponce } from './responce';
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
    await this.userService.userRegister(dto);
    const token = await this.tokenService.generateJWT(dto.email);
    const userFind = JSON.parse(
      JSON.stringify(await this.userService.publicUser(dto.email)),
    );
    return { ...userFind, token };
  }
  async loginAuth(dto: LoginDTO): Promise<AuthResponce> {
    const user = await this.userService.findUser(dto.email);
    if (!user) throw new BadRequestException(AppError.USER_NOT_FOUND);
    const validateUser = await bcrypt.compare(dto.password, user.password);
    if (!validateUser)
      throw new BadRequestException(AppError.USER_WRONG_PASSWORD);
    const userFind = JSON.parse(
      JSON.stringify(await this.userService.publicUser(dto.email)),
    );
    const token = await this.tokenService.generateJWT(userFind);
    return { ...userFind, token };
  }
  async updateUser(email, dto: UpdateUsername): Promise<UpdateUserResponce> {
    const userUpdate = await this.userService.updateUser(email, dto);
    return {
      username: userUpdate.user.username,
      email,
      phone: userUpdate.user.phone,
    };
  }
}
