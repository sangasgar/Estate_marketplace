import { Body, Controller, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDTO, UpdateUsername } from 'src/modules/user/dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto';
import { JwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  registerUsers(@Body() dto: CreateUserDTO) {
    return this.authService.registerUser(dto);
  }
  @Post('login')
  login(@Body() dto: LoginDTO) {
    return this.authService.loginAuth(dto);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('update-user')
  updateUser(@Body() dto: UpdateUsername, @Req() request) {
    const user = request.user;
    return this.authService.updateUser(user.email, dto);
  }
}
