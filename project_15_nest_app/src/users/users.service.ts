import { Injectable, ConflictException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";
import {RolesDto} from "./dto/roles.dto";
import {Role} from "../roles/entities/role.entity";

@Injectable()
export class UsersService {

  constructor(
      @InjectRepository(User) private userRepo: Repository<User>,
      @InjectRepository(Role) private roleRepo: Repository<Role>
  ) {
  }

  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }

  findAll() {
    return this.userRepo.find();
  }

  findOne(id: string) {
    return this.userRepo.findOne({where: {id}});
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userRepo.save({...updateUserDto, id});
  }

  remove(id: string) {
    return this.userRepo.delete({id});
  }

  async assignRoles(id: string, rolesDto: RolesDto) {
    try {
      const foundUser = await this.userRepo.findOne({where: {id}});

      const roles: Array<Role> = [];

      for (const roleId of rolesDto.roleIds) {
        roles.push(await this.roleRepo.findOne({where: {id: roleId}}));
      }

      // validation ok!

      const updatedUser = await this.userRepo.save({...foundUser, roles});

      // TODO: Remove Password!

      return updatedUser;

    } catch (err) {
      // console.log('err?', err);
      throw new BadRequestException({error: 'Error assign roles'});
    }
  }
}
