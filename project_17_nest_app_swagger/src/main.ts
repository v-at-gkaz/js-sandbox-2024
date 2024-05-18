import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const swaggerConfig = new DocumentBuilder()
    .setTitle(configService.get('SWAGGER_TITLE') || 'The Nest APP API')
    .setDescription(
      configService.get('SWAGGER_DESCR') || 'The Nest APP API description',
    )
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Users')
    .addTag('Roles')
    .addTag('Posts')
    .build();

  const swaggerOptions = new DocumentBuilder().addBearerAuth();

  // @ts-ignore
  const document = SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions);
  SwaggerModule.setup('doc', app, document);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const port = configService.get('SERVER_PORT') || 3000;

  await app.listen(port, '0.0.0.0');

  const url = await app.getUrl();

  console.log(`Server started at ${url}`);
}
bootstrap();
