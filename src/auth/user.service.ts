import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository, ObjectID } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  findById(id: string | ObjectID) {
    return this.userRepository.findOne(id);
  }

  findByEmail(email: string) {
    return this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  create(user: User) {
    return this.userRepository.save(user);
  }

  async updateName(id: string, email: string, name: string) {
    const result = await this.userRepository.update(
      {
        id,
      },
      { name },
    );
    return name;
  }
}
