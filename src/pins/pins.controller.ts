import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  BadRequestException,
  Delete,
  Param,
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

  @Get()
  @UseGuards(AuthGuard())
  getPins(@Request() req) {
    const user = req.user;
    this.validateUser(user);
    return this.pinsService.getDashboardPins(user.id);
  }

  @Post('blacklist')
  @UseGuards(AuthGuard())
  blacklist(@Request() req) {
    const user = req.user;
    this.validateUser(user);

    const { pinId } = req.body;

    return this.pinsService.blackList(pinId, user.id);
  }

  @Delete('blacklist/:pinId')
  @UseGuards(AuthGuard())
  removeUserFromBlacklist(@Request() req, @Param() param) {
    const user = req.user;
    this.validateUser(user);

    const pinId = param.pinId;

    return this.pinsService.removeUserFromBlacklist(pinId, user.id);
  }

  private validateUser(user) {
    if (user === undefined || user === null || !user.id) {
      throw new BadRequestException('User or user id is undefined');
    }
  }
}
