import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { Topics } from '../shared';

@Entity()
export class Pin {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  title: string;

  @Column()
  topic: Topics;

  @Column()
  description: string;

  @Column()
  link: string;

  @Column()
  image: string;

  @Column()
  comments: Array<{
    comment: string;
    userId: ObjectID;
  }>;
}
