import { CartModule } from 'src/cart/cart.module';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";

@Module({
  providers: [AuthService, AuthResolver],
  imports:[
    forwardRef(() => UsersModule),
    PassportModule,
    JwtModule.register({
      secret: "secretKey",
      signOptions: { expiresIn: '30d' },
    }),
  ],exports:[AuthService]
})
export class AuthModule {}
