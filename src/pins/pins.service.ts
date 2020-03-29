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

  async createComment(pinId: string, userId: string, comment: string) {
    if (pinId === null || pinId === undefined) {
      throw new BadRequestException('PinId not provided');
    }

    if (userId === null || userId === undefined) {
      throw new BadRequestException('UserId not provided');
    }

    if (comment === null || comment === undefined) {
      throw new BadRequestException('Comment not provided');
    }

    const pin = await this.pinRepository.findOne(pinId);

    if (!pin.comments) {
      pin.comments = [];
    }

    pin.comments.push({
      comment,
      createdAt: new Date(),
      userId: new ObjectID(userId),
    });
    return this.pinRepository.save(pin);
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
        userBlackList: {
          $not: {
            $elemMatch: {
              $eq: userId,
            },
          },
        },
      },
    });
  }

  async getPin(pinId: string) {
    if (pinId === undefined || pinId === null) {
      throw new BadRequestException('Pin id not defined');
    }
    const pin = await this.pinRepository.findOne(pinId);

    if (pin === undefined || pin === null) {
      throw new NotFoundException('Pin not found');
    }

    return pin;
  }

  async blackList(pinId: string, userId: string) {
    const pin = await this.pinRepository.findOne(pinId);

    if (pin === undefined || pin === null) {
      throw new NotFoundException('Pin not found');
    }

    if (pin.userBlackList && pin.userBlackList.length > 0) {
      pin.userBlackList.push(new ObjectID(userId));
    } else {
      pin.userBlackList = [new ObjectID(userId)];
    }

    return this.pinRepository.save(pin);
  }

  async removeUserFromBlacklist(pinId: string, userId: string) {
    const pin = await this.pinRepository.findOne(pinId);

    if (pin === undefined || pin === null) {
      throw new NotFoundException('Pin not found');
    }

    if (!pin.userBlackList || pin.userBlackList.length <= 0) {
      throw new BadRequestException('User didnt blacklist the pin');
    }

    pin.userBlackList = pin.userBlackList.filter(
      id => !id.equals(new ObjectID(userId)),
    );

    return this.pinRepository.save(pin);
  }
}
