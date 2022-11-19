import {forwardRef, Module} from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { ReceiptResolver } from './receipt.resolver';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ReceiptEntity} from "../entities/receipt.entity";
import {ProductsModule} from "../products/products.module";
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([ReceiptEntity]),
  UsersModule,
  forwardRef(() => ProductsModule)],
  providers: [ReceiptService, ReceiptResolver],
  exports:[
    ReceiptService
  ]
})
export class ReceiptModule {}
