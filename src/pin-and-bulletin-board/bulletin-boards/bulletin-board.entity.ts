import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { Pin } from '../pins';

@Entity()
export class BulletinBoard {
  @ObjectIdColumn()
  id: ObjectID;

  @ObjectIdColumn()
  userId: ObjectID;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  pins: Pin[];
}
