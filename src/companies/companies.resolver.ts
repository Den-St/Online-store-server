import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CompaniesService } from './companies.service';
import { CompanyEntity } from '../entities/company.entity';
import { UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CompanyCreateDto } from './dto/company-create.dto';
import { AuthGuard } from '../guards/auth.guard';

@Resolver('Company')
export class CompaniesResolver {
  constructor(private readonly companyService: CompaniesService) {}

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Mutation(() => CompanyEntity)
  async createCompany(
    @Args('createCompany') dto: CompanyCreateDto,
  ): Promise<CompanyEntity> {
    console.log("s",dto)
    return await this.companyService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Query(() => [CompanyEntity])
  async getUsersCompanies(
    @Args('getUsersCompanies') id: number,
  ): Promise<CompanyEntity[]> {
    return this.companyService.getUsersCompanies(id);
  }

  
}
