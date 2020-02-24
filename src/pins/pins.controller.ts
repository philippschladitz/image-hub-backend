import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  BadRequestException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { UserService } from '../auth/user.service';
import { PinsService } from './pins.service';

@Controller('pins')
export class PinsController {
  constructor(
    private readonly pinsService: PinsService,
    private readonly userService: UserService,
  ) {}

  @Get('')
  @UseGuards(AuthGuard())
  finished(@Request() req) {
    const user = req.user;
    this.validateUser(user);
  }

  private validateUser(user) {
    if (user === undefined || user === null || !user.id) {
      throw new BadRequestException('User or user id is undefined');
    }
  }
}
