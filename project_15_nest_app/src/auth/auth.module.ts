import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { UsersService } from "../users/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Role} from "../roles/entities/role.entity";
import {LocalStrategy} from "./local.strategy";
import {JwtModule} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";
import { config } from 'dotenv';
import {JwtStrategy} from "./jwt.strategy";
config();
const configService = new ConfigService();

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Role]),
    UsersModule,
    JwtModule.register({
      secret: configService.get('JWT_SECRET', 'SimpleSecret'),
      signOptions: { expiresIn: configService.get('JWT_EXPIRES_IN', '60s') },
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, LocalStrategy, JwtStrategy]
})
export class AuthModule {}
