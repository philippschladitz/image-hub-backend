import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { JwtStrategy } from './jwt.strategy';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Global()
@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secretOrPrivateKey: 'yourSecret',
            signOptions: {
                expiresIn: '1d',
            },
        }), // pass your own secret inside
    ],
    providers: [
        UserService,
        AuthService,
        JwtStrategy,
    ],
    controllers: [
        AuthController,
    ],
    exports: [
        PassportModule,
        AuthService,
        UserService,
    ],
})
export class AuthModule { }
