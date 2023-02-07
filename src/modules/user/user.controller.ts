import { Body, Controller, Patch, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/guards';
import { UpdateUsername } from './dto';

@Controller('user')
export class UserController {}
