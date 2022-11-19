import { ProductEntity } from 'src/entities/product.entity';
import { ProductsModule } from 'src/products/products.module';
import { CompaniesModule } from './../companies/companies.module';
import { CartModule } from './../cart/cart.module';
import { AuthModule } from './../auth/auth.module';
import { Module, forwardRef } from '@nestjs/common';
import { UserEntity } from '../entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { RolesModule } from '../roles/roles.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    RolesModule,
    forwardRef(() => CartModule),
    CompaniesModule,
    JwtModule.register({
      secret: 'secretKey',
      signOptions: { expiresIn: '30d' },
    }),
    forwardRef(() => AuthModule),
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
