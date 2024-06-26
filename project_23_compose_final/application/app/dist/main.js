"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle(configService.get('SWAGGER_TITLE') || 'The Nest APP API')
        .setDescription(configService.get('SWAGGER_DESCR') || 'The Nest APP API description')
        .setVersion('1.0')
        .addTag('Auth')
        .addTag('Users')
        .addTag('Roles')
        .addTag('Posts')
        .build();
    const swaggerOptions = new swagger_1.DocumentBuilder().addBearerAuth();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig, swaggerOptions);
    swagger_1.SwaggerModule.setup('doc', app, document);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    const port = configService.get('SERVER_PORT') || 3000;
    await app.listen(port, '0.0.0.0');
    const url = await app.getUrl();
    console.log(`Server started at ${url}`);
}
bootstrap();
