import { Entity, Column, PrimaryGeneratedColumn, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity()
export class Test {
  @ObjectIdColumn()
  id: ObjectID;

  @Column({ length: 500 })
  name: string;
}