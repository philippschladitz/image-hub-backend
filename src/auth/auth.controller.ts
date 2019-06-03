import { Controller, Body, Post, Get, UseGuards } from "@nestjs/common";

import { AuthService } from "./auth.service";
import { User } from "./user.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    login(@Body() user: User) {
        return this.authService.login(user);
    }

    @Post('register')
    register(@Body() user: User) {
        return this.authService.register(user);
    }
}