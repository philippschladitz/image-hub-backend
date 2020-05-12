import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PinsController, PinsService, Pin } from './pins';
import {
  BulletinBoardsService,
  BulletinBoardsController,
  BulletinBoard,
} from './bulletin-boards';

@Module({
  imports: [TypeOrmModule.forFeature([Pin, BulletinBoard])],
  controllers: [PinsController, BulletinBoardsController],
  providers: [PinsService, BulletinBoardsService],
})
export class PinAndBulletinBoardModule {}
