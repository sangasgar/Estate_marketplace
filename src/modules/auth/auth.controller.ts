import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDTO, UpdateUsername } from 'src/modules/user/dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto';
import { JwtAuthGuard, JwtRefreshTokenGuard } from './guards';
import { AuthResponce, RefreshResponce, UpdateUserResponce } from './responce';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiTags('AuthAPI')
  @ApiResponse({ status: 200, type: AuthResponce })
  @Post('register')
  registerUsers(@Body() dto: CreateUserDTO): Promise<AuthResponce> {
    return this.authService.registerUser(dto);
  }
  @ApiTags('AuthAPI')
  @ApiResponse({ status: 200, type: AuthResponce })
  @Post('login')
  login(@Body() dto: LoginDTO): Promise<AuthResponce> {
    return this.authService.loginAuth(dto);
  }
  @UseGuards(JwtRefreshTokenGuard)
  @ApiTags('AuthAPI')
  @ApiResponse({ status: 200, type: RefreshResponce })
  @Get('refresh')
  refresh(@Req() request): Promise<RefreshResponce> {
    const user = request.user;
    console.log(user);
    return this.authService.refreshToken(user);
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
