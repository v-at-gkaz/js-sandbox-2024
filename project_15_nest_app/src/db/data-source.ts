import { DataSource, DataSourceOptions } from 'typeorm';
import { join } from 'node:path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
config();
const configService = new ConfigService();

const cfg: DataSourceOptions = {
  type: 'postgres',
  host: configService.get('NODEAPP_HOST', 'localhost'),
  port: configService.get('NODEAPP_PORT', 5432),
  username: configService.get('NODEAPP_USER', 'user'),
  password: configService.get('NODEAPP_PASS', '123456'),
  database: configService.get('NODEAPP_DB', 'db'),
  //schema: 'typeorm',
  entities: [join(__dirname, '..', '**', '*.entity{.ts,.js}')],
  migrations: [join(__dirname, 'migrations', '**', '*.{.ts,.js}')],
  migrationsTableName: 'migrations_typeorm',
  // synchronize: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export default new DataSource(cfg);
