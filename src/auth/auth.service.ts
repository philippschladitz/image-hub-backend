import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    login(user: User) {
        return this.validate(user).then(validatedUser => {
            if (!validatedUser) {
                return { status: 401 };
            }

            const payload = {
                id: validatedUser.id,
                email: validatedUser.email,
            };
            const accessToken = this.jwtService.sign(payload);

            return {
                expires_in: 3600,
                access_token: accessToken,
                user_id: payload,
                status: 200,
            };
        });
    }

    async register(user: User) {
        const existingUser = await this.userService.findByEmail(user.email);
        if (existingUser) {
            throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
        }

        const createdUser = await this.userService.create(user);
        return {
            email: createdUser.email,
        };
    }

    async validateUser(jwtPayload: JwtPayload) {
        if (jwtPayload.id && jwtPayload.email) {
            const findByEmail = await this.userService.findByEmail(jwtPayload.email);
            return findByEmail !== null && findByEmail !== undefined;
        }
        return false;
    }

    private async validate(user: User) {
        const userInDb = await this.userService.findByEmail(user.email);
        if (userInDb === null || userInDb === undefined) {
            return null;
        }
        return userInDb.validatePassword(user.password) ? userInDb : null;
    }
}
