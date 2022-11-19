import {Module} from '@nestjs/common';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {RoleEntity} from "../entities/role.entity";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports:[TypeOrmModule.forFeature([RoleEntity]),JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: '1h' },
  })],
  providers: [RolesResolver, RolesService],
  exports:[
      RolesService
  ]
})
export class RolesModule {}
