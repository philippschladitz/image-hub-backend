import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Topics } from '../../shared';
import { UserFactsService } from '../../user-facts';
import { BulletinBoard } from './bulletin-board.entity';

@Injectable()
export class BulletinBoardsService {
  constructor(
    @InjectRepository(BulletinBoard)
    private bulletinBoardRepository: Repository<BulletinBoard>,
    private readonly userFactsService: UserFactsService,
  ) {}

  create(userId: string, boardName: string) {
    const bulletinBoard = this.bulletinBoardRepository.create();
    bulletinBoard.name = boardName;
    bulletinBoard.pins = [];
    bulletinBoard.userId = new ObjectID(userId);
    return this.bulletinBoardRepository.save(bulletinBoard);
  }

  getAll(userId: string) {
    return this.bulletinBoardRepository.find({
      where: {
        userId,
      },
    });
  }
}
