import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppError } from 'src/common/constant/error';
import { JwtAuthGuard } from '../auth/guards';
import { Role } from '../auth/guards/enums/role.enum';
import { RolesGuard } from '../auth/guards/role.guard';
import { HasRoles } from '../auth/guards/roles.decorator';
import { CategoryDeleteDTO, CategoryDTO, CategoryUpdateDTO } from './dto';
import { CategoryService } from './category.service';
import { CategoryResponse, CategoryStatusResponse } from './response';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @ApiTags('CategoryApi')
  @ApiResponse({ status: 200, type: CategoryResponse })
  @HasRoles(Role.Admin, Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createCategory(
    @Body() categoryDTO: CategoryDTO,
  ): Promise<CategoryResponse> {
    categoryDTO.category_name[0].toUpperCase() +
      categoryDTO.category_name.substring(1).toLowerCase();
    const category = await this.categoryService.findCategory({
      category_name: categoryDTO.category_name,
    });
    if (category)
      throw new HttpException(AppError.CATEGORY_FOUND, HttpStatus.FOUND);
    return this.categoryService.createCategory(categoryDTO);
  }
  @ApiTags('CategoryApi')
  @ApiResponse({ status: 200, type: CategoryResponse })
  @HasRoles(Role.Admin, Role.Authorized, Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch()
  async updateCategory(
    @Body() categoryUpdate: CategoryUpdateDTO,
  ): Promise<CategoryResponse> {
    const category = await this.categoryService.findCategory({
      id: categoryUpdate.id,
    });
    if (!category)
      throw new HttpException(
        AppError.CATEGORY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return this.categoryService.updateCategory(categoryUpdate);
  }

  @ApiTags('CategoryApi')
  @ApiResponse({ status: 200, type: CategoryResponse })
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(30)
  @Get()
  async getAllCategory(): Promise<CategoryResponse[]> {
    return this.categoryService.getAllCategory();
  }

  @ApiTags('CategoryApi')
  @ApiResponse({ status: 200 })
  @HasRoles(Role.Admin, Role.Authorized, Role.Manager)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete()
  async deleteCategory(
    @Body() deleteCategory: CategoryDeleteDTO,
  ): Promise<CategoryStatusResponse> {
    const category = await this.categoryService.findCategory({
      id: deleteCategory.id,
    });
    if (!category)
      throw new HttpException(
        AppError.CATEGORY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    return this.categoryService.deleteCategory(deleteCategory);
  }
}
