import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Pin } from './pin.entity';
import { Topics } from '../shared';

@Injectable()
export class PinsService {
  constructor(@InjectRepository(Pin) private pinRepository: Repository<Pin>) {}

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

  get() {
    return this.pinRepository.find();
  }
}
