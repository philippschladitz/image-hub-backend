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
  Put,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

import { ObjectID } from 'typeorm';

import { UserService } from '../../auth/user.service';
import { BulletinBoardsService } from './bulletin-boards.service';
import { transformBulletinBoardToResponse } from '../utils';

@Controller('bulletin-boards')
export class BulletinBoardsController {
  constructor(
    private readonly bulletinBoardsService: BulletinBoardsService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @UseGuards(AuthGuard())
  async create(@Request() req) {
    const user = req.user;
    this.userService.validate(user);

    const bulletinBoard = await this.bulletinBoardsService.create(
      user.id,
      req.body.boardName,
    );

    return transformBulletinBoardToResponse(bulletinBoard, this.userService);
  }

  @Get()
  @UseGuards(AuthGuard())
  async getAll(@Request() req) {
    const user = req.user;
    this.userService.validate(user);

    const bulletinBoards = await this.bulletinBoardsService.getAll(user.id);
    const transformed = [];
    for (const bulletinBoard of bulletinBoards) {
      const transformedBulletinBoard = await transformBulletinBoardToResponse(
        bulletinBoard,
        this.userService,
      );
      transformed.push(transformedBulletinBoard);
    }

    return transformed;
  }

  @Put()
  @UseGuards(AuthGuard())
  update(@Request() req) {
    const user = req.user;
    this.userService.validate(user);
  }

  @Delete()
  @UseGuards(AuthGuard())
  delete(@Request() req) {
    const user = req.user;
    this.userService.validate(user);
  }

  @Put('pin')
  @UseGuards(AuthGuard())
  addPin(@Request() req) {
    const user = req.user;
    this.userService.validate(user);
  }
}
