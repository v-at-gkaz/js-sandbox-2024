import { ormConfig } from './app.module';
import { DataSource, DataSourceOptions } from 'typeorm';

export default new DataSource(<DataSourceOptions>ormConfig);
