import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {RolesDto} from "./dto/roles.dto";
import {Role} from "../roles/entities/role.entity";
import * as bcrypt from "bcrypt";
import { config } from 'dotenv';
import {ConfigService} from "@nestjs/config";
config();
const configService = new ConfigService();

const saltOrRounds = +configService.get('PASSWORD_HASH_SALT_OR_ROUNDS', 10);

@Injectable()
export class UsersService {

  constructor(
      @InjectRepository(User) private userRepo: Repository<User>,
      @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {
    // console.log('UsersService constructor detected >>>>>>>>>>>>>>>>>>>>>>>>>>>>');
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    const createdUser = await this.userRepo.save(createUserDto);
    delete createdUser.password;
    return createdUser;
  }

  findAll() {
    return this.userRepo.find();
  }

  async findOne(id: string) {
    const foundUser = await this.userRepo.findOne({where: {id}});
    delete foundUser.password;
    return foundUser;
  }

  async findUser(username: string, password: string) {
    try {
      const foundUser = await this.userRepo.findOne(
          {
            select: ['login', 'password'],
            where: {login: username}
          });
      console.log('user?', foundUser);
      if(await bcrypt.compare(password, foundUser.password)){
        // FIXME: (Passport!)
        const { password, ...result } = foundUser;
        return result;
      }
    } catch (e) {
      return null;
    }

  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = { ...updateUserDto, id };

    if(user.password) {
      user.password = await bcrypt.hash(user.password, saltOrRounds);
    }

    const updatedUser = await this.userRepo.save(user);
    delete updatedUser.password;
    return updatedUser;
  }

  remove(id: string) {
    return this.userRepo.delete({id});
  }

  async assignRoles(id: string, rolesDto: RolesDto) {
    try {
      const foundUser = await this.userRepo.findOne({where: {id}});

      const roles: Array<Role> = [];

      for (const roleId of rolesDto.roleIds) {

        const found = roles.filter(role=>{
          return role.id === roleId;
        });

        if(!found.length){
          roles.push(await this.roleRepo.findOne({where: {id: roleId}}));
        }
      }
      // validation ok!
      const updatedUser = await this.userRepo.save({...foundUser, roles});
      delete updatedUser.password;
      return updatedUser;

    } catch (err) {
      // console.log('err?', err);
      throw new BadRequestException({error: 'Error assign roles'});
    }
  }
}
