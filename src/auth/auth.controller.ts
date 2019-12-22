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
        userEntity.age = userDto.age;

        const namePart = userDto.email.split('@')[0];
        const splitByDot = namePart.split('.');
        userEntity.name = splitByDot
            .map(name => name.charAt(0).toUpperCase() + name.substring(1))
            .reduce((previous, current, index) => index !== 0 ? `${previous} ${current}` : current, '');

        return this.authService.register(userEntity);
    }
}
