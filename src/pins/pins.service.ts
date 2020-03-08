import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Pin } from './pin.entity';
import { Topics } from '../shared';
import { UserFactsService } from '../user-facts';

@Injectable()
export class PinsService {
  constructor(
    @InjectRepository(Pin) private pinRepository: Repository<Pin>,
    private readonly userFactsService: UserFactsService,
  ) {}

  create(pin: {
    title: string;
    topic: Topics;
    description: string;
    link: string;
    image: string;
  }) {
    const pinEntity = this.pinRepository.create();

    pinEntity.title = pin.title;
    pinEntity.topic = pin.topic;
    pinEntity.description = pin.description;
    pinEntity.link = pin.link;
    pinEntity.image = pin.image;

    return this.pinRepository.save(pinEntity);
  }

  async getDashboardPins(userId: string) {
    const userTopics = await this.userFactsService.getTopics(userId);

    if (!userTopics) {
      throw new NotFoundException('User topics not found.');
    }

    // mongodb use $in as a query operator
    // In() is used by sql, e.g. postgres
    return this.pinRepository.find({
      where: {
        topic: {
          $in: userTopics.topics,
        },
      },
    });
  }
}
