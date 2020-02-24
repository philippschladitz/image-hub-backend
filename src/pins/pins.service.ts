import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Pin } from './pin.entity';

@Injectable()
export class PinsService {
  constructor(@InjectRepository(Pin) private pinRepository: Repository<Pin>) {}
}
