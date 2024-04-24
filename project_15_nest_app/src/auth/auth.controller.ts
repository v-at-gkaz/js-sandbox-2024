import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {SigninUserDto} from "./dto/signin-user.dto";

@Controller('v1.0/auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    create(@Body() signinUserDto: SigninUserDto) {
        return this.authService.signIn(signinUserDto.username, signinUserDto.password);
    }
}
