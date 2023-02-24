import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CategoryDeleteDTO, CategoryDTO, CategoryUpdateDTO } from './dto';
import { Category } from './model/category.model';
import { CategoryResponse, CategoryStatusResponse } from './response';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category) private readonly categoryRepository: typeof Category,
  ) {}
  async createCategory(categoryDto: CategoryDTO): Promise<CategoryResponse> {
    try {
      const category = await this.categoryRepository.create({ ...categoryDto });
      return category;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getAllCategory(): Promise<CategoryResponse[]> {
    const category = await this.categoryRepository.findAll();
    return category;
  }
  async findCategory(field): Promise<CategoryResponse> {
    try {
      const category = await this.categoryRepository.findOne({
        where: field,
      });
      return category;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteCategory(id: CategoryDeleteDTO): Promise<CategoryStatusResponse> {
    try {
      const deleteCategory = await this.categoryRepository.destroy({
        where: { ...id },
      });
      if (deleteCategory === 1) return { status: true };
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateCategory(
    categoryDTO: CategoryUpdateDTO,
  ): Promise<CategoryResponse> {
    try {
      await this.categoryRepository.update(
        { ...categoryDTO },
        { where: { id: categoryDTO.id } },
      );
      return this.findCategory({ id: categoryDTO.id });
    } catch (error) {
      throw new Error(error);
    }
  }
}
