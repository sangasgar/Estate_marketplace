import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards';
import { RoleDeleteDTO, RoleDTO, RoleUpdateDTO } from './dto';
import { ErrorResponse, RoleResponse, RolesResponse } from './response';
import { RoleService } from './role.service';

@Controller('dashboard/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @ApiTags('RolesAPI')
  @ApiResponse({ status: 201, type: RoleResponse })
  @UseGuards(JwtAuthGuard)
  @Post('add')
  createRole(@Body() roleDto: RoleDTO): Promise<RoleResponse | ErrorResponse> {
    return this.roleService.create(roleDto);
  }

  @ApiTags('RolesAPI')
  @ApiResponse({ status: 200, type: RolesResponse })
  @UseGuards(JwtAuthGuard)
  @Get('all')
  findRole() {
    return this.roleService.findAllRole();
  }

  @ApiTags('RolesAPI')
  @ApiResponse({ status: 200, type: RoleUpdateDTO })
  @UseGuards(JwtAuthGuard)
  @Patch('update')
  updateRole(@Body() roleDto: RoleUpdateDTO): Promise<boolean> {
    return this.roleService.updateRole(roleDto.id, roleDto.name);
  }
  @ApiTags('RolesAPI')
  @ApiResponse({ status: 200, type: RoleDeleteDTO })
  @Delete()
  deleteRole(@Body() deleteRole: RoleDeleteDTO): Promise<boolean> {
    return this.roleService.deleteRole(deleteRole.id);
  }
}
