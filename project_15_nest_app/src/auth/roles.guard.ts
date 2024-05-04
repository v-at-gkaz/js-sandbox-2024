import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {Role} from "../roles/entities/role.entity";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(
      @InjectRepository(User) private userRepo: Repository<User>,
      private reflector: Reflector
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const { user } = context.switchToHttp().getRequest();
    const userId = user.userId;

    const userWithRoles = await this.userRepo.findOne({
      select: ['roles'],
      where: { id: userId },
      relations: ['roles']
    });

    if(!userWithRoles) {
      return false;
    }

    const receivedRoles = userWithRoles.roles.map((role: Role) => {
      return role.name;
    });

    const allowedRoles = this.reflector.getAllAndOverride('roles', [context.getHandler(), context.getClass()]);
    for (const alowedRole of allowedRoles) {
      if(receivedRoles.includes(alowedRole))
      return true;
    }
    return false;
  }
}
