import { ImageModule } from './../image/image.module';
import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CompanyEntity} from "../entities/company.entity";
import {UserEntity} from "../entities/user.entity";

@Module({
  imports:[TypeOrmModule.forFeature([CompanyEntity,UserEntity]),ImageModule],
  providers: [CompaniesService, CompaniesResolver],
  exports:[
      CompaniesService
  ]
})
export class CompaniesModule {}
