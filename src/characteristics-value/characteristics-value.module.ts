import { Module } from '@nestjs/common';
import { CharacteristicsValueResolver } from './characteristics-value.resolver';
import { CharacteristicsValueService } from './characteristics-value.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { CharacteristicValueEntity } from 'src/entities/characteristic-value.entity';
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports:[TypeOrmModule.forFeature([CharacteristicValueEntity]),JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: '1h' },
  })],
  providers: [CharacteristicsValueResolver, CharacteristicsValueService],
  exports:[
      CharacteristicsValueService
  ]
})
export class CharacteristicsValueModule {}
