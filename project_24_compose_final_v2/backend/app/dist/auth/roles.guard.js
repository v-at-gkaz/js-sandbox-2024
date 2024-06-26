"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const core_1 = require("@nestjs/core");
let RolesGuard = class RolesGuard {
    constructor(userRepo, reflector) {
        this.userRepo = userRepo;
        this.reflector = reflector;
    }
    async canActivate(context) {
        const { user } = context.switchToHttp().getRequest();
        const userId = user.userId;
        const userWithRoles = await this.userRepo.findOne({
            select: ['roles'],
            where: { id: userId },
            relations: ['roles']
        });
        if (!userWithRoles) {
            return false;
        }
        const receivedRoles = userWithRoles.roles.map((role) => {
            return role.name;
        });
        const allowedRoles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);
        for (const alowedRole of allowedRoles) {
            if (receivedRoles.includes(alowedRole))
                return true;
        }
        return false;
    }
};
exports.RolesGuard = RolesGuard;
exports.RolesGuard = RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        core_1.Reflector])
], RolesGuard);
