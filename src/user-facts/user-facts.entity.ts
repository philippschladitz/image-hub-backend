import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';
import { Topics } from '../shared';

@Entity()
export class UserFacts {
  @ObjectIdColumn()
  id: ObjectID;

  @Column('string')
  userId: ObjectID;

  @Column()
  gender: 'male' | 'female' | 'userDefined';

  @Column()
  userDefinedGender: string;

  @Column()
  country: string;

  @Column()
  language: string;

  @Column()
  topics: Topics[];
}
