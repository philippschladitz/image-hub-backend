import { Entity, Column, BeforeInsert, ObjectIdColumn, ObjectID } from 'typeorm';
import * as crypto from 'crypto';

@Entity()
export class User {
    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    name: string;

    @Column()
    age: number;

    // run sha algorithm for security reasons before inserting into the db
    @BeforeInsert()
    hashPassword() {
        this.password = crypto.createHmac('sha256', this.password).digest('hex');
    }

    validatePassword(password: string) {
        const hashed = crypto.createHmac('sha256', password).digest('hex');
        return this.password === hashed;
    }
}
