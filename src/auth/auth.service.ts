import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { UserService } from "./user.service";
import { User } from "./user.entity";
import { JwtPayload } from "./jwt-payload";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    private validate(user: User) {
        return this.userService.findByEmail(user.email);
    }

    login(user: User) {
        return this.validate(user).then((user) => { 
            if(!user) {
                return { status: 404 }
            }

            const payload = {
                id: user.id,
                name: user.name
            };
            const accessToken = this.jwtService.sign(payload);

            return { 
                expires_in: 3600,
                access_token: accessToken,
                user_id: payload,
                status: 200
            };
        })
    }

    register(user: User) {
        return this.userService.create(user);
    }

    validateUser(jwtPayload: JwtPayload) {
        if (jwtPayload.id && jwtPayload.name) {
            return Boolean(this.userService.findById(jwtPayload.id));
        }
        return false;
    }
}