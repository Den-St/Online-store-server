import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { CategoryEntity } from './../entities/category.entity';
import { CategoryCreateDto } from './dto/category-create.dto';
import { UseGuards, UsePipes } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CategoriesAddCharDto } from './dto/categories-add-char.dto';
import { Roles } from '../decorators/roles.decorator';
import { RoleGuard } from '../guards/role.guard';

@Resolver('Category')
export class CategoriesResolver {
  constructor(private readonly categoryService: CategoriesService) {}

  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @UsePipes(ValidationPipe)
  @Mutation(() => CategoryEntity)
  async createCategory(@Args('createCategory') dto: CategoryCreateDto) {
    return await this.categoryService.create(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Mutation(() => CategoryEntity)
  async addCharToCategory(
    @Args('addCharToCategory') dto: CategoriesAddCharDto,
  ): Promise<CategoryEntity> {
    return await this.categoryService.addChar(dto);
  }

  @Query(() => [CategoryEntity])
  async getAllMainCategories(): Promise<CategoryEntity[]> {
    return await this.categoryService.getAllMain();
  }
  @Query(() => [CategoryEntity])
  async getAllNotMainCategories(): Promise<CategoryEntity[]> {
    return await this.categoryService.getAllNotMain();
  }

  @Query(() => CategoryEntity)
  async getCategoryById(
    @Args('getCategoryById') id: number,
  ): Promise<CategoryEntity> {
    return await this.categoryService.getById(id);
  }

  @Query(() => [CategoryEntity])
  async getChildCategories(
    @Args('getChildCategories') id: number,
  ): Promise<CategoryEntity[]> {
    return await this.categoryService.getChildCategories(id);
  }

  @Query(() => [CategoryEntity])
  async getCategoriesLine(
    @Args('getCategoriesLine') id:number,
  ): Promise<CategoryEntity[]> {
    return await this.categoryService.getCategoriesLine(id);
  }
}
