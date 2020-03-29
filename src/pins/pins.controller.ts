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
import { UserService } from '../auth/user.service';
import { PinsService } from './pins.service';
import { PinResponseDto } from './pin-response.dto';
import { ObjectID } from 'typeorm';
import { Pin } from './pin.entity';

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

  @Get(':pinId')
  @UseGuards(AuthGuard())
  async getPin(@Request() req, @Param() param) {
    const user = req.user;
    this.validateUser(user);
    const pinId = param.pinId;

    const pin = await this.pinsService.getPin(pinId);
    return this.transformCommentUserNames(pin);
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

  @Post('comment/:pinId')
  @UseGuards(AuthGuard())
  async comment(@Request() req, @Param() param) {
    const user = req.user;
    this.validateUser(user);

    const pinId = param.pinId;
    const comment = req.body.comment;

    const pin = await this.pinsService.createComment(pinId, user.id, comment);
    return this.transformCommentUserNames(pin);
  }

  private validateUser(user) {
    if (user === undefined || user === null || !user.id) {
      throw new BadRequestException('User or user id is undefined');
    }
  }

  private async transformCommentUserNames(pin: Pin) {
    const comments: Array<{
      comment: string;
      createdAt: Date;
      userId: ObjectID;
      userName: string;
    }> = [];

    if (pin.comments && pin.comments.length > 0) {
      for (const comment of pin.comments) {
        const commentUser = await this.userService.findById(comment.userId);
        comments.push({
          ...comment,
          userName: commentUser.name,
        });
      }
    }

    return {
      ...pin,
      comments,
    } as PinResponseDto;
  }
}
