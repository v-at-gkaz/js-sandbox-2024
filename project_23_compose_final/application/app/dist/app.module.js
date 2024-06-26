"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = exports.ormConfig = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const node_path_1 = require("node:path");
const users_module_1 = require("./users/users.module");
const roles_module_1 = require("./roles/roles.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const auth_module_1 = require("./auth/auth.module");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const posts_module_1 = require("./posts/posts.module");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
const configParams = {
    isGlobal: true,
    envFilePath: ['.env'],
};
const staticDirConfig = {
    rootPath: (0, node_path_1.join)(__dirname, '..', 'client'),
    exclude: ['/api*'],
};
exports.ormConfig = {
    type: 'postgres',
    host: configService.get('SUBD_HOST', 'localhost'),
    port: configService.get('SUBD_PORT', 5432),
    username: configService.get('SUBD_USER', 'user'),
    password: configService.get('SUBD_PASS', '123456'),
    database: configService.get('SUBD_DB', 'db'),
    schema: 'typeorm',
    entities: [(0, node_path_1.join)(__dirname, '**', '*.entity{.ts,.js}')],
    migrations: [(0, node_path_1.join)(__dirname, 'migrations', '*{.ts,.js}')],
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
};
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(configParams),
            serve_static_1.ServeStaticModule.forRoot(staticDirConfig),
            typeorm_1.TypeOrmModule.forRoot(exports.ormConfig),
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            auth_module_1.AuthModule,
            posts_module_1.PostsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
