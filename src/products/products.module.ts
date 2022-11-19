import { UsersModule } from 'src/users/users.module';
import { CartModule } from '../cart/cart.module';
import { ImageModule } from './../image/image.module';
import {forwardRef, Module} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProductEntity} from "../entities/product.entity";
import {CategoriesModule} from "../categories/categories.module";
import {CompaniesModule} from "../companies/companies.module";
import {CharacteristicsModule} from "../characteristics/characteristics.module";
import {CharacteristicsValueModule} from "../characteristics-value/characteristics-value.module";
import {ReceiptModule} from "../receipt/receipt.module";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports:[TypeOrmModule.forFeature([ProductEntity]),
      CompaniesModule,CategoriesModule, CharacteristicsModule,
      CharacteristicsValueModule,forwardRef(() => ReceiptModule),
      ImageModule,CartModule,UsersModule,
      JwtModule.register({
          secret: "secretKey",
          signOptions: { expiresIn: '1h' },
      }),
  ],
  providers: [ProductsService, ProductsResolver],
  exports:[
      ProductsService
  ]
})
export class ProductsModule {}
