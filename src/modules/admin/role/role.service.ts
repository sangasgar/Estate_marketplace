import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AppError } from 'src/common/constant/error';
import { Role } from './model/role.model';
import { ErrorResponse, RoleResponse, RolesResponse } from './response';

@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role)
    private readonly roleRepository: typeof Role,
  ) {}
  async create(dto): Promise<RoleResponse | ErrorResponse> {
    try {
      const roleExist = await this.roleRepository.findOne({
        where: { name: dto.name },
      });
      if (roleExist) {
        return { error: AppError.ROLE_EXIST };
      }
      const role = await this.roleRepository.create({ name: dto.name });
      return { id: role.id, name: role.name };
    } catch (error) {
      throw new Error(error);
    }
  }
  async findAllRole(): Promise<RolesResponse> {
    try {
      const findRoles = await this.roleRepository.findAll();
      return { roles: findRoles };
    } catch (error) {
      throw new Error(error);
    }
  }
  async updateRole(id: number, name: string): Promise<boolean> {
    try {
      const updateRole = await this.roleRepository.update(
        { name },
        { where: { id } },
      );
      if (updateRole[0] === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async deleteRole(id: number): Promise<boolean> {
    try {
      const deleteRole = await this.roleRepository.destroy({ where: { id } });
      if (deleteRole === 1) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
