import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from "@nestjs/config";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true
      }),
  );

  const configService = app.get(ConfigService);

  const port = configService.get('SERVER_PORT') || 3000;

  await app.listen(port, '0.0.0.0');

  const url = await app.getUrl();

  console.log(`Server started at ${url}`);

}
bootstrap();
