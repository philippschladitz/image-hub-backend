import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('bearer'),
      secretOrKey: 'yourSecret',
    });
  }

  async validate(payload: JwtPayload) {
    console.log('payload', payload);
    const user = await this.authService.validateUser(payload);
    console.log('validated', user);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
