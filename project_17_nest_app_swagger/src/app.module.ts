import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { PostsModule } from './posts/posts.module';

config();
const configService = new ConfigService();

const configParams = {
  isGlobal: true,
  envFilePath: ['.env'],
};

const staticDirConfig = {
  rootPath: join(__dirname, '..', 'client'),
  exclude: ['/api*'],
};

export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: configService.get('SUBD_HOST', 'localhost'),
  port: configService.get('SUBD_PORT', 5432),
  username: configService.get('SUBD_USER', 'user'),
  password: configService.get('SUBD_PASS', '123456'),
  database: configService.get('SUBD_DB', 'db'),
  schema: 'typeorm',
  entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
  // synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

@Module({
  imports: [
    ConfigModule.forRoot(configParams),
    ServeStaticModule.forRoot(staticDirConfig),
    TypeOrmModule.forRoot(ormConfig),
    UsersModule,
    RolesModule,
    AuthModule,
    PostsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
