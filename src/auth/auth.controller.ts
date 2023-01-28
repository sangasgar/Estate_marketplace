import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/user/dto';
import { AuthService } from './auth.service';
import { LoginDTO } from './dto';

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
}
