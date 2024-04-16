import { Module } from '@nestjs/common';
import { ConfigModule } from "@nestjs/config";
import { ContactsModule } from './contacts/contacts.module';
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from 'node:path';

const configParams = {
    isGlobal: true,
    envFilePath: ['.env'],
};

const staticDirConfig = {
    rootPath: join(__dirname, '..', 'client', 'one', 'two', '42'),
    exclude: ['/api*']
};

@Module({
  imports: [
      ConfigModule.forRoot(configParams),
      ServeStaticModule.forRoot(staticDirConfig),
      ContactsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
