import { ProductEntity } from './../entities/product.entity';
import { tokenT } from './../auth/types/tokenT';
import { UserEditDto } from './dto/user-edit.dto';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserEntity } from '../entities/user.entity';
import { UserCreateDto } from './dto/user-create.dto';
import { Roles } from '../decorators/roles.decorator';
import { ParseIntPipe, UseGuards, UsePipes } from '@nestjs/common';
import { RoleGuard } from '../guards/role.guard';
import { ValidationPipe } from '../pipes/validation.pipe';
import { AuthGuard } from 'src/guards/auth.guard';
import { CompanyEntity } from 'src/entities/company.entity';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Mutation(() => UserEntity)
  async createUser(
    @Args('createUser') dto: UserCreateDto,
  ): Promise<UserEntity> {
    return await this.userService.createUser(dto);
  }

  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Query(() => [UserEntity])
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.userService.getAll();
  }

  @Roles('ADMIN')
  @UseGuards(RoleGuard)
  @Mutation(() => UserEntity)
  async giveAdminRole(
    @Args('giveAdminRole', ParseIntPipe) userId: number,
  ): Promise<UserEntity> {
    return await this.userService.giveAdminRole(userId);
  }

  @Query(() => UserEntity)
  async getUserById(@Args('getUserById') id: number): Promise<UserEntity> {
    return await this.userService.getUserById(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => tokenT)
  async editUserInfo(@Args('editUserInfo') dto: UserEditDto): Promise<tokenT> {
    return await this.userService.editUserInfo(dto);
  }

  @Query(() => [ProductEntity])
  async getUsersRecentlyViewed(@Args("getUsersRecentlyViewed") userId:number):Promise<ProductEntity[]> {
    return await this.userService.getUsersRecentlyViewed(userId);
  }

  @Query(() => [ProductEntity])
  async getUsersFavoriteProducts(@Args("getUsersFavoriteProducts") userId:number):Promise<ProductEntity[]> {
    return await this.userService.getUsersFavoriteProducts(userId);
  }

  @UseGuards(AuthGuard)
  @Query(() => [CompanyEntity])
  async getUsersCompanies(
    @Args('getUsersCompanies') id: number,
  ): Promise<CompanyEntity[]> {
    return this.userService.getUsersCompanies(id);
  }
}
