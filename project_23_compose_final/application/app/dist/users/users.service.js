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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const role_entity_1 = require("../roles/entities/role.entity");
const bcrypt = require("bcrypt");
const dotenv_1 = require("dotenv");
const config_1 = require("@nestjs/config");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
const saltOrRounds = +configService.get('PASSWORD_HASH_SALT_OR_ROUNDS', 10);
const ROLE_USER_NAME = 'user';
const ROLE_ADMIN_NAME = 'admin';
let UsersService = class UsersService {
    constructor(userRepo, roleRepo) {
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }
    async create(createUserDto) {
        createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
        let adminRole = await this.roleRepo.findOne({
            where: { name: ROLE_ADMIN_NAME }
        });
        if (!adminRole) {
            adminRole = await this.roleRepo.save({ name: ROLE_ADMIN_NAME });
        }
        let userRole = await this.roleRepo.findOne({
            where: { name: ROLE_USER_NAME }
        });
        if (!userRole) {
            userRole = await this.roleRepo.save({ name: ROLE_USER_NAME });
        }
        const newUser = { ...createUserDto };
        newUser['roles'] = [userRole];
        if (createUserDto.login === 'admin') {
            newUser['roles'].push(adminRole);
        }
        const createdUser = await this.userRepo.save(newUser);
        delete createdUser.password;
        return createdUser;
    }
    findAll() {
        return this.userRepo.find();
    }
    async findOne(id) {
        const foundUser = await this.userRepo.findOne({ where: { id } });
        delete foundUser.password;
        return foundUser;
    }
    async findUser(username, password) {
        try {
            const foundUser = await this.userRepo.findOne({
                select: ['id', 'login', 'password'],
                where: { login: username }
            });
            if (await bcrypt.compare(password, foundUser.password)) {
                const { password, ...result } = foundUser;
                return result;
            }
            return null;
        }
        catch (e) {
            return null;
        }
    }
    async update(id, updateUserDto) {
        const user = { ...updateUserDto, id };
        if (user.password) {
            user.password = await bcrypt.hash(user.password, saltOrRounds);
        }
        const updatedUser = await this.userRepo.save(user);
        delete updatedUser.password;
        return updatedUser;
    }
    remove(id) {
        return this.userRepo.delete({ id });
    }
    async assignRoles(id, rolesDto) {
        try {
            const foundUser = await this.userRepo.findOne({ where: { id } });
            const roles = [];
            for (const roleId of rolesDto.roleIds) {
                const found = roles.filter(role => {
                    return role.id === roleId;
                });
                if (!found.length) {
                    roles.push(await this.roleRepo.findOne({ where: { id: roleId } }));
                }
            }
            const updatedUser = await this.userRepo.save({ ...foundUser, roles });
            delete updatedUser.password;
            return updatedUser;
        }
        catch (err) {
            throw new common_1.BadRequestException({ error: 'Error assign roles' });
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(role_entity_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UsersService);
