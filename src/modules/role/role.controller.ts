import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppError } from 'src/common/constant/error';
import { JwtAuthGuard } from '../auth/guards';
import { Role } from '../auth/guards/enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { HasRoles } from '../auth/guards/roles.decorator';
import { RoleDeleteDTO, RoleDTO, RoleUpdateDTO } from './dto';
import { RoleResponse, RolesResponse } from './response';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @ApiTags('RolesAPI')
  @ApiResponse({ status: 201, type: RoleResponse })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createRole(@Body() roleDto: RoleDTO): Promise<RoleResponse> {
    roleDto.name[0].toUpperCase() + roleDto.name.substring(1).toLowerCase();
    const roleExist = await this.roleService.findRole(roleDto);
    if (roleExist)
      throw new HttpException(AppError.ROLE_EXIST, HttpStatus.FOUND);
    return this.roleService.create(roleDto);
  }

  @ApiTags('RolesAPI')
  @ApiResponse({ status: 200, type: RolesResponse })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('all')
  async findRole() {
    return this.roleService.findAllRole();
  }

  @ApiTags('RolesAPI')
  @ApiResponse({ status: 200, type: RoleUpdateDTO })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  async updateRole(@Body() roleDto: RoleUpdateDTO): Promise<boolean> {
    return this.roleService.updateRole(roleDto.id, roleDto.name);
  }
  @ApiTags('RolesAPI')
  @ApiResponse({ status: 200, type: RoleDeleteDTO })
  @HasRoles(Role.Manager, Role.Authorized, Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async deleteRole(@Body() deleteRole: RoleDeleteDTO): Promise<boolean> {
    return this.roleService.deleteRole(deleteRole.id);
  }
}
