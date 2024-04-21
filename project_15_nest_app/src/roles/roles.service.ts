import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Role} from "./entities/role.entity";

@Injectable()
export class RolesService {

  constructor(@InjectRepository(Role) private roleRepo: Repository<Role>) {
  }

  create(createRoleDto: CreateRoleDto) {
    return this.roleRepo.save(createRoleDto);
  }

  findAll() {
    return this.roleRepo.find();
  }

  findOne(id: string) {
    return this.roleRepo.findOne({where: {id}});
  }

  update(id: string, updateRole: UpdateRoleDto) {
    return this.roleRepo.save({...updateRole, id});
  }

  remove(id: string) {
    return this.roleRepo.delete({id});
  }
}
