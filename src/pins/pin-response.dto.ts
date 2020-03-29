import { Topics } from '../shared';
import { ObjectID } from 'typeorm';

export interface PinResponseDto {
  id: ObjectID;
  title: string;
  topic: Topics;
  description: string;
  link: string;
  image: string;
  comments: Array<{
    comment: string;
    createdAt: Date;
    userId: ObjectID;
    userName: string;
  }>;
  userBlackList: ObjectID[];
}
