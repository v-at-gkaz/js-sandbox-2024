import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {User} from "./entities/user.entity";

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private userRepo: Repository<User>) {
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
}
