import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { UsersModule } from './users/users.module';
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CompaniesModule } from './companies/companies.module';
import { CategoriesModule } from './categories/categories.module';
import { CharacteristicsModule } from './characteristics/characteristics.module';
import { CharacteristicsValueModule } from './characteristics-value/characteristics-value.module';
import { ReceiptModule } from './receipt/receipt.module';
import { AppResolver } from './app.resolver';
import { ImageModule } from './image/image.module';
import { CartModule } from './cart/cart.module';
import { CartItemsModule } from './cart-items/cart-items.module';

@Module({
  imports: [
      ConfigModule.forRoot({isGlobal:true,envFilePath:'./.env'}),
      GraphQLModule.forRoot<ApolloDriverConfig>({
          driver: ApolloDriver,
          autoSchemaFile: 'schema.gql',
          context: ({req}) => ({headers:req.headers,}),
          cors: {
              origin: 'http://localhost:3000',
              credentials: true,
          },
      }),
      TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => ({
              type: 'postgres',
              host: configService.get('API_HOST'),
              username: configService.get('TYPEORM_USERNAME'),
              password: configService.get('TYPEORM_PASSWORD'),
              database: configService.get('TYPEORM_DATABASE'),
              entities: [__dirname + 'dist/**/*.entity{.js,.ts}'],
              synchronize: true,
              autoLoadEntities:true,
              logging:true
          }),
          inject: [ConfigService],
      }),
      UsersModule,
      RolesModule,
      AuthModule,
      CartModule,
      ProductsModule,
      CompaniesModule,
      CategoriesModule,
      CharacteristicsModule,
      CharacteristicsValueModule,
      ReceiptModule,
      ImageModule,
      CartItemsModule,
  ],
  controllers: [],
  providers: [AppResolver],
})
export class AppModule {
    constructor() {
    }
}
