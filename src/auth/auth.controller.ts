import { Controller, Body, Post, Get, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { User } from './user.entity';
import { UserDTO } from './user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() userDto: UserDTO) {
        const userEntity = new User();
        userEntity.email = userDto.email;
        userEntity.password = userDto.password;

        return this.authService.login(userEntity);
    }

    @Post('register')
    register(@Body() userDto: UserDTO) {
        const userEntity = new User();
        userEntity.email = userDto.email;
        userEntity.password = userDto.password;

        return this.authService.register(userEntity);
    }
}
