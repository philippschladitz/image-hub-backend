import {
  Controller,
  Get,
  UseGuards,
  Post,
  Request,
  BadRequestException,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { ObjectID } from 'typeorm';

import { UserService } from '../../auth/user.service';
import { PinsService } from './pins.service';
import { PinResponseDto } from './pin-response.dto';
import { Pin } from './pin.entity';

import { transformPinToResponse } from '../utils';

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
    this.userService.validate(user);
    return this.pinsService.getDashboardPins(user.id);
  }

  @Get(':pinId')
  @UseGuards(AuthGuard())
  async getPin(@Request() req, @Param() param) {
    const user = req.user;
    this.userService.validate(user);

    const pinId = param.pinId;

    const pin = await this.pinsService.getPin(pinId);
    return transformPinToResponse(pin, this.userService);
  }

  @Post('blacklist')
  @UseGuards(AuthGuard())
  blacklist(@Request() req) {
    const user = req.user;
    this.userService.validate(user);

    const { pinId } = req.body;

    return this.pinsService.blackList(pinId, user.id);
  }

  @Delete('blacklist/:pinId')
  @UseGuards(AuthGuard())
  removeUserFromBlacklist(@Request() req, @Param() param) {
    const user = req.user;
    this.userService.validate(user);

    const pinId = param.pinId;

    return this.pinsService.removeUserFromBlacklist(pinId, user.id);
  }

  @Post('comment/:pinId')
  @UseGuards(AuthGuard())
  async comment(@Request() req, @Param() param) {
    const user = req.user;
    this.userService.validate(user);

    const pinId = param.pinId;
    const comment = req.body.comment;

    const pin = await this.pinsService.createComment(pinId, user.id, comment);
    return transformPinToResponse(pin, this.userService);
  }

  @Post('photo/:pinId')
  @UseGuards(AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  async uploadPhoto(
    @UploadedFile() file,
    @Body() body,
    @Request() req,
    @Param() param,
  ) {
    const user = req.user;
    this.userService.validate(user);

    const pinId = param.pinId;
    const comment = body.comment;
    const base64 = (file.buffer as Buffer).toString('base64');

    const pin = await this.pinsService.createPhoto(
      pinId,
      user.id,
      comment,
      base64,
    );
    return transformPinToResponse(pin, this.userService);
  }
}
