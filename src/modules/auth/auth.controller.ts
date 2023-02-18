import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppError } from 'src/common/constant/error';
import { CreateUserDTO, UpdateUsername } from 'src/modules/user/dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto';
import { JwtAuthGuard, JwtRefreshTokenGuard } from './guards';
import { AuthResponce, RefreshResponce, UpdateUserResponce } from './responce';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @ApiTags('AuthAPI')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: AuthResponce })
  @Post('register')
  async registerUsers(@Body() dto: CreateUserDTO): Promise<AuthResponce> {
    const userExist = await this.userService.findUser(dto.email);
    if (userExist)
      throw new HttpException(AppError.USER_EXIST, HttpStatus.FOUND);
    return this.authService.registerUser(dto);
  }
  @ApiTags('AuthAPI')
  @HttpCode(200)
  @ApiResponse({ status: 200, type: AuthResponce })
  @Post('login')
  async login(@Body() dto: LoginDTO): Promise<AuthResponce> {
    const user = await this.userService.findUser(dto.email);
    if (!user)
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    return this.authService.loginAuth(dto, user);
  }
  @UseGuards(JwtRefreshTokenGuard)
  @ApiTags('AuthAPI')
  @ApiResponse({ status: 200, type: RefreshResponce })
  @HttpCode(200)
  @Get('refresh')
  async refresh(@Req() request): Promise<RefreshResponce> {
    const user = request.user;
    const userFind = await this.userService.findUser(user.email);
    if (!userFind)
      throw new HttpException(AppError.USER_NOT_FOUND, HttpStatus.NOT_FOUND);
    return this.authService.refreshToken(userFind);
  }
  @UseGuards(JwtAuthGuard)
  @ApiTags('AuthAPI')
  @ApiResponse({ status: 200, type: UpdateUsername })
  @Patch('update-user')
  updateUser(
    @Body() dto: UpdateUsername,
    @Req() request,
  ): Promise<UpdateUserResponce> {
    const user = request.user;
    return this.authService.updateUser(user.email, dto);
  }
}
