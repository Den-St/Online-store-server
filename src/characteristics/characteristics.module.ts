import { Module } from '@nestjs/common';
import { CharacteristicsResolver } from './characteristics.resolver';
import { CharacteristicsService } from './characteristics.service';
import {CharacteristicsValueModule} from "../characteristics-value/characteristics-value.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CharacteristicEntity} from "../entities/characteristic.entity";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports:[TypeOrmModule.forFeature([CharacteristicEntity]),
      CharacteristicsValueModule,
      JwtModule.register({
          secret: "secretKey",
          signOptions: { expiresIn: '1h' },
      }),],
  providers: [CharacteristicsResolver, CharacteristicsService],
  exports:[
      CharacteristicsService
  ]
})
export class CharacteristicsModule {}
