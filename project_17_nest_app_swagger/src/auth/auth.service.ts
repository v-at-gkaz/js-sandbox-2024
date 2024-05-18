import {Injectable} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {
    }

    async validateUser(username: string, pass: string){
        const user = await this.usersService.findUser(username, pass);
        if(user) {
            return user;
        }
        return null;
    }

    async login(user: any) {
        const payload = {username: user.login,  sub: user.id}; // { username: user.username, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

}
