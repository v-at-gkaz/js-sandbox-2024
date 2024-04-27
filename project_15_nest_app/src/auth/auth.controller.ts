import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {LocalAuthGuard} from "./local-auth.guard";
import {AuthService} from "./auth.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";

@Controller('v1.0/auth')
export class AuthController {

    constructor(
        protected usersService: UsersService,
        private authService: AuthService) {
    }

    @UseGuards(LocalAuthGuard)
    @Post('signin')
    async signIn(@Request() req: any) {
        return this.authService.login(req.user);
    }

    @Post('signup')
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

}
