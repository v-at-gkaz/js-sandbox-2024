import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {
    }

    async signIn(username: string, pass: string){
        const user = await this.usersService.findUser(username, pass);
        if(!user) {
            throw new UnauthorizedException();
        }
        return user;
    }

}
